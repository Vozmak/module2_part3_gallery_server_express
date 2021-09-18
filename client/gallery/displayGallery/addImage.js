"use strict";
// import { getPage } from './moduls/getPage';
const imgForm = document.querySelector('.sendImg');
imgForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchParams = new URL(window.location.href).searchParams;
    const page = searchParams.get('page') || localStorage.page || '1';
    const uploadImg = await fetch(`http://127.0.0.1:2000/gallery/${page}`, {
        method: "POST",
        body: new FormData(imgForm),
    });
    const uploadResult = await uploadImg.json();
    if (uploadImg.status !== 200) {
        alert(uploadResult.errorMessage);
        return;
    }
    alert(`${uploadResult.message}\nЗагружены следующие изображения:\n${uploadResult.objects.join('\n')}`);
    window.location.reload();
});
//# sourceMappingURL=addImage.js.map