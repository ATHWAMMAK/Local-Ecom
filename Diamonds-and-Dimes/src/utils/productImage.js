export function getProductImageUrl(imagePath) {
  if (!imagePath) return ''

  // Keep externally hosted images unchanged.
  if (/^https?:\/\//i.test(imagePath)) return imagePath

  // Add the Vite base path for GitHub Pages.
  const base = import.meta.env.BASE_URL || '/'
  const cleanPath = String(imagePath).replace(/^\/+/, '')

  return `${base}${cleanPath}`
}
