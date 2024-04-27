import toast from "react-hot-toast";

export async function upload(ev, callbackFn) {
  const file = ev.target.files?.[0];

  if (file) {
    const uploadPromise = new Promise((resolve, reject) => {
      const data = new FormData();
      data.append('file', file);

      fetch('/api/upload-to-cloudinary', { // Change the endpoint to your Cloudinary upload endpoint
        method: 'POST',
        body: data,
      })
        .then(response => {
          if (response.ok) {
            response.json().then(link => {
              callbackFn(link);
              resolve(link);
            });
          } else {
            reject();
          }
        })
        .catch(error => {
          console.error('Upload error:', error);
          reject(error);
        });
    });

    await toast.promise(uploadPromise, {
      loading: 'Uploading...',
      success: 'Uploaded!',
      error: 'Upload error!',
    });
  }
}
