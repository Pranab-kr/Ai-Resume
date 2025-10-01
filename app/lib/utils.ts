/**
 * Converts bytes to human-readable format
 * @param bytes - The number of bytes to convert
 * @returns A human-readable string with appropriate unit (B, KB, MB, GB, TB)
 * 
 * @example
 * formatFileSize(1024) // "1.0 KB"
 * formatFileSize(1048576) // "1.0 MB"
 * formatFileSize(5242880) // "5.0 MB"
 * formatFileSize(1073741824) // "1.0 GB"
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${units[i]}`;
};

export const generateUUID = () => crypto.randomUUID();