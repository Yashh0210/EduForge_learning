/**
 * Extracts YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID
 * - VIDEO_ID (if just the ID is provided)
 */
export const extractYouTubeVideoId = (url) => {
  if (!url || typeof url !== 'string') {
    return null;
  }

  // If it's already just an ID (no special characters except alphanumeric, dash, underscore)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
    return url.trim();
  }

  // Remove any whitespace
  url = url.trim();

  // Pattern for youtube.com/watch?v=VIDEO_ID
  let match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (match) {
    return match[1];
  }

  // Pattern for youtu.be/VIDEO_ID
  match = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (match) {
    return match[1];
  }

  // Pattern for youtube.com/embed/VIDEO_ID
  match = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (match) {
    return match[1];
  }

  // If URL contains v= parameter
  match = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (match) {
    return match[1];
  }

  return null;
};


