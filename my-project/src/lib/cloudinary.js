/**
 * Cloudinary Helper
 * Used for generating optimized image URLs on the fly.
 * Cloudinary offers 25GB of free storage and automatic optimization.
 */

// Replace with your Cloudinary Cloud Name after you create an account
const CLOUDINARY_CLOUD_NAME = 'dprfwfyhj'; 

export const getOptimizedImage = (publicId, options = {}) => {
  if (!publicId) return '';
  
  // Add extension if not present
  const idWithExt = publicId.includes('.') ? publicId : `${publicId}.jpg`;
  
  // Base URL
  let url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/`;
  
  // transformations
  const transformations = ['f_auto', 'q_auto'];
  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.crop) transformations.push(`c_${options.crop}`);

  return `${url}${transformations.join(',')}/${idWithExt}`;
};

/**
 * Generates an optimized Video URL
 */
export const getOptimizedVideo = (publicId) => {
  if (!publicId) return '';
  const idWithExt = publicId.includes('.') ? publicId : `${publicId}.mp4`;
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/f_auto,q_auto/${idWithExt}`;
};
