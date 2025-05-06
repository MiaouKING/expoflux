import { getAPIs } from "/js/APIs.js";

const APIs = getAPIs();

export async function crop_image(titlee, iconn) {
  Swal.fire({
    title: titlee,
    icon: iconn,
    html: `
      <img id="crop_preview" src="https://sweetalert2.github.io/images/picture.jpg">
      <div>
        <img id="cropperjs" src="https://sweetalert2.github.io/images/picture.jpg">
      </div>
    `,
    willOpen: function() {
      const image = Swal.getPopup().querySelector('#cropperjs')
      const cropper = new APIs.cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        crop: function () {
          const croppedCanvas = cropper.getCroppedCanvas()
          const preview = Swal.getPopup().querySelector('#crop_preview')
          preview.src = croppedCanvas.toDataURL()
        },
      })
    },
    preConfirm: () => {
      return (Swal.getPopup().querySelector('#crop_preview')).src
    },
  });
};