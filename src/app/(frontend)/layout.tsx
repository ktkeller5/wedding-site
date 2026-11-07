import React from 'react'
import type { Metadata } from 'next'
import { Bodoni_Moda, Yellowtail } from 'next/font/google'
import { ThemeVars, content } from './site-config'
import './styles.css'

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
  display: 'swap',
})

const yellowtail = Yellowtail({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-yellowtail',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: content.seo.title,
  description: content.seo.description,
  icons: { icon: '/icon.svg' },
  openGraph: {
    title: content.seo.title,
    description: content.seo.description,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${yellowtail.variable}`}>
      <head>
        <ThemeVars />
      </head>
      <body className="min-h-screen bg-[#fffaf0] text-[#394027] antialiased">
        <div id="root" tabIndex={-1}>
          {children}
        </div>
      </body>
    </html>
  )
}
