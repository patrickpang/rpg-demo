module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{png,html,webmanifest,js,css}'],
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  swDest: 'dist/sw.js',
  clientsClaim: true,
  skipWaiting: true,
}
