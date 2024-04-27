import toast from "react-hot-toast";
import { v2 as cloudinary } from 'cloudinary';

export async function upload(ev, callbackFn) {
  const file = ev.target.files?.[0];

  if (file) {
    // Initialize Cloudinary with your cloud name and upload preset
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
      // Upload file to Cloudinary
      const result = await cloudinary.uploader.upload(file, {
        upload_preset: 'YOUR_UPLOAD_PRESET'
      });

      // Callback function with the uploaded image URL
      callbackFn(result.secure_url);

      // Show success message
      toast.success('Uploaded to Cloudinary!');
    } catch (error) {
      // Show error message
      toast.error('Upload to Cloudinary failed!');
      console.error('Error uploading to Cloudinary:', error);
    }
  }
}
