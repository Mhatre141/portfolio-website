import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-heading' })

export const metadata: Metadata = {
  title: 'Ayush Mhatre | AI/ML Developer',
  description: 'Portfolio of Ayush Mhatre, AI/ML Developer specializing in end-to-end data pipelines, predictive models, and intelligent systems.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-black antialiased overflow-x-hidden text-white`}>
        {children}
      </body>
    </html>
  )
}
