import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function absoluteUrl(path: string){
  if(typeof window !== 'undefined') return path
  if(process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`
  return `https://localhost:${process.env.PORT ?? 3000}${path}`
}

export function constructMetadata({
  title = "CineVerse - Personalized Cine Expedition",
  description = "CineVerse is a new and exciting way to enjoy movies using advanced AI technology. It has four main features to make your movie-watching experience better.",
  image = "/shanks1.jpg",
  icons = "/icon.png",
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
   
    icons,
    metadataBase: new URL('https://cine-x.vercel.app/'),
    themeColor: '#FFF',
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}