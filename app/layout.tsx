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
  title: 'Vaese AI — AI Services for Business Growth',
  description:
    'Vaese AI helps business owners grow and automate with AI — voice agents, websites, chatbots, automations, lead generation and sales categorization.',
  keywords: ['AI agency', 'voice agents', 'chatbots', 'automatisering', 'AI diensten', 'Nederland'],
  openGraph: {
    title: 'Vaese AI — AI Services for Business Growth',
    description:
      'Vaese AI helps business owners grow and automate with AI — voice agents, websites, chatbots, automations, lead generation and sales categorization.',
    type: 'website',
    siteName: 'Vaese AI',
    images: [{ url: '/logo.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaese AI — AI Services for Business Growth',
    description:
      'Vaese AI helps business owners grow and automate with AI — voice agents, websites, chatbots, automations, lead generation and sales categorization.',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
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
