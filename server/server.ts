import * as express from 'express';
import * as cors from 'cors';
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import * as fileUpload from 'express-fileupload'
import {router} from './routes/routes'
import {logger} from "./logger/logger";
import {authorizationChecker} from "./middleware/authorizationChecker";

const app = express();
const PORT: number = 2000;
const hostname: string = '127.0.0.1';
const swaggerDocument = YAML.load(`server/swagger/swaggerAPI.yaml`);

app.use(cors({
    origin: '*',
}));
app.use(express.json());
app.all('*', authorizationChecker);
app.use(logger);
app.use(express.static(`${__dirname}/gallery/images`));
app.use(fileUpload());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', router);

app.listen(PORT, hostname, () => {
    console.log(`Listening server: ${hostname}:${PORT}`);
    logger('Server start')
});
