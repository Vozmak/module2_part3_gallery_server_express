"use strict";
// import { getPage } from './moduls/getPage';
const imgForm = document.querySelector('.sendImg');
imgForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchParams = new URL(window.location.href).searchParams;
    const page = searchParams.get('page') || localStorage.page || '1';
    const images = imgForm.elements.namedItem('photo');
    const response = await fetch(`http://127.0.0.1:2000/gallery/${page}`, {
        method: "POST",
        headers: {
            "Content-type": "multipart/form-data",
            "Authorization": localStorage.token,
        },
        body: new FormData(imgForm),
    });
    console.log(response.json());
});
//# sourceMappingURL=addImage.js.map