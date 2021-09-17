// import { getPage } from './moduls/getPage';

const imgForm = <HTMLFormElement>document.querySelector('.sendImg');

imgForm.addEventListener('submit', async (event: Event) => {
  event.preventDefault();

  const searchParams = new URL(window.location.href).searchParams;
  const page: string = searchParams.get('page') || localStorage.page || '1';
  const images = <HTMLInputElement>imgForm.elements.namedItem('photo');


  const response: Response = await fetch(`http://127.0.0.1:2000/gallery/${page}`, {
    method: "POST",
    headers: {
      "Content-type": "multipart/form-data",
      "Authorization": localStorage.token,
    },
    body: new FormData(imgForm),
  })

  console.log(response.json());
});
