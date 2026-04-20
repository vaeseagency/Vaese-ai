import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import CustomCursor from '@/components/layout/CustomCursor'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vaese AI — Building the Autonomous Layer',
  description:
    'Vaese AI builds enterprise AI systems that automate workflows, deploy voice agents, and run business processes autonomously — so your team can focus on what matters.',
  keywords: ['AI agency', 'AI automation', 'voice agents', 'AI chatbots', 'RAG', 'process automation', 'Vaese AI'],
  openGraph: {
    title: 'Vaese AI — Building the Autonomous Layer',
    description:
      'Vaese AI builds enterprise AI systems that automate workflows, deploy voice agents, and run business processes autonomously.',
    type: 'website',
    siteName: 'Vaese AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaese AI — Building the Autonomous Layer',
    description: 'Enterprise AI that thinks, acts, and scales.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body bg-bg text-white antialiased selection:bg-primary/30 selection:text-white">
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
