import type { Metadata } from 'next'
import { Sora, DM_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['400', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Plazi — El sistema de estudio para oposiciones AGE C1 y C2',
  description:
    'Prepara las oposiciones AGE con preguntas del BOE oficial y exámenes reales del INAP. Sistema de repaso inteligente que te dice exactamente qué estudiar cada día. Gratis. C1 y C2 turno libre.',
  robots: 'index, follow',
  alternates: { canonical: 'https://plazi.es/' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sora.variable} ${dmSans.variable}`}>
      <head>
        <Script
          defer
          data-domain="plazi.es"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
