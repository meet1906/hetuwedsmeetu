/**
 * Cloudinary Helper
 * Used for generating optimized image URLs on the fly.
 * Cloudinary offers 25GB of free storage and automatic optimization.
 */

// Replace with your Cloudinary Cloud Name after you create an account
const CLOUDINARY_CLOUD_NAME = 'dprfwfyhj'; 

/**
 * Generates an optimized Cloudinary URL
 * @param {string} publicId - The public ID of the uploaded asset
 * @param {object} options - Transformation options (width, height, quality, etc.)
 */
export const getOptimizedImage = (publicId, options = {}) => {
  if (!publicId) return '';
  
  // Base URL
  let url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/`;
  
  // Add transformations: 
  // f_auto: automatic format (WebP/AVIF if supported)
  // q_auto: automatic quality
  // w_auto: optional responsive width
  const transformations = ['f_auto', 'q_auto'];
  
  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.crop) transformations.push(`c_${options.crop}`);

  return `${url}${transformations.join(',')}/${publicId}`;
};

/**
 * Generates an optimized Video URL
 */
export const getOptimizedVideo = (publicId) => {
  if (!publicId) return '';
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/f_auto,q_auto/${publicId}`;
};
