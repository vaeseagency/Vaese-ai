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
  metadataBase: new URL('https://vaese.ai'),
  title: {
    default: 'Vaese AI | AI Automatisering & Voice Agents voor Bedrijven',
    template: '%s | Vaese AI',
  },
  description:
    'Vaese AI helpt bedrijfseigenaren groeien met AI: voice agents, chatbots, website automatisering, lead generatie en sales categorisatie. Schaal je bedrijf met slimme AI-oplossingen op maat.',
  keywords: [
    'AI automatisering bedrijven',
    'voice agent Nederland',
    'AI chatbot bouwen',
    'lead generatie AI',
    'sales automatisering',
    'AI diensten Nederland',
    'chatbot voor bedrijven',
    'AI agency Nederland',
    'bedrijfsautomatisering AI',
    'AI oplossingen MKB',
    'voice agents',
    'AI website',
    'automatisering',
    'Vaese AI',
  ],
  authors: [{ name: 'Vaese AI', url: 'https://vaese.ai' }],
  creator: 'Vaese AI',
  category: 'technology',
  alternates: {
    canonical: 'https://vaese.ai',
    languages: {
      'nl-NL': 'https://vaese.ai',
      'en-US': 'https://vaese.ai',
    },
  },
  openGraph: {
    title: 'Vaese AI | AI Automatisering & Voice Agents voor Bedrijven',
    description:
      'Vaese AI helpt bedrijfseigenaren groeien met AI: voice agents, chatbots, website automatisering, lead generatie en sales categorisatie.',
    type: 'website',
    url: 'https://vaese.ai',
    siteName: 'Vaese AI',
    locale: 'nl_NL',
    images: [{ url: '/logo.png', width: 720, height: 240, alt: 'Vaese AI — AI Automatisering voor Bedrijven' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaese AI | AI Automatisering & Voice Agents voor Bedrijven',
    description:
      'Vaese AI helpt bedrijfseigenaren groeien met AI: voice agents, chatbots, automatisering, lead generatie en sales categorisatie.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vaese AI',
  url: 'https://vaese.ai',
  logo: 'https://vaese.ai/logo.png',
  description:
    'Vaese AI helpt bedrijfseigenaren groeien met AI: voice agents, chatbots, website automatisering, lead generatie en sales categorisatie.',
  areaServed: 'NL',
  serviceType: [
    'Voice Agents',
    'AI Chatbots',
    'Website Automatisering',
    'Lead Generatie',
    'Sales Categorisatie',
    'AI Automatisering',
  ],
  sameAs: ['https://vaese.ai'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body bg-bg text-white antialiased selection:bg-primary/30 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
