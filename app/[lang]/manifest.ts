import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Julia Ribetki',
    short_name: 'JR',
    description: 'Julia Ribetki Progressive Web App',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: 'https://cdn.sanity.io/images/yu97ucqm/production/b97c42acbe47bebe7c59c4bd89f675bcd1c7039f-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://cdn.sanity.io/images/yu97ucqm/production/07ef7a191f6052f36862ccd4425b4ad85ed3ed87-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}