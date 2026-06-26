export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary credentials are not set in .env");
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  // Cloudinary has auto-detection for resource_type, but 'auto' is safest for mixed images/videos
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Cloudinary Upload Error: ${errorData.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  return data.secure_url; // This is the permanent HTTPS link to the uploaded file
}
