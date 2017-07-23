'use strict';

const _HANDLE_TYPE = [
  'image/png',
  'image/jpeg'
];

const _IMGUR_UPLOAD_CDN = 'https://api.imgur.com/3/image';

const app = new Vue({
  el: '#app',
  data: {
    images: []
  },
  methods: {
    handleFileChange: handleFileChange,
    isHandleType: isHandleType,
    uploadImage: uploadImage
  }
});

function handleFileChange(e) {
  const files = e.target.files;

  if (files.length === 0) {
    return;
  }

  const handleNewImgur = (res) => {
    this.images.push({
      src: res.data.link
    });
  };

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (this.isHandleType(file.type)) {
      this.uploadImage(file, handleNewImgur);
    } else {
      alert('is not handle handle type, file =', file);
    }
  }
}

function isHandleType(type) {
  return _HANDLE_TYPE.indexOf(type) !== -1;
}

function uploadImage(file, callback) {
  const formData = new FormData();
  formData.append('image', file);

  const options = {
    method: 'POST',
    headers: {
      Authorization: config.imgurToken
    },
    body: formData
  };

  fetch(_IMGUR_UPLOAD_CDN, options)
    .then(res => res.json())
    .then(callback);
}
