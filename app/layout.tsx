import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Plazi — El sistema de estudio para oposiciones AGE',
  description:
    'Contenido oficial del BOE, exámenes reales del INAP y un sistema que te dice exactamente qué estudiar cada día. Gratis. Turno libre C1 y C2.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-white font-sans text-gray-900">{children}</body>
    </html>
  )
}
