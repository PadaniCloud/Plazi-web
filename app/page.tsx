import { Suspense } from 'react'
import Link from 'next/link'
import { WaitlistForm } from '@/components/WaitlistForm'
import { getWaitlistCount } from '@/lib/waitlist'

async function WaitlistCount() {
  const count = await getWaitlistCount()
  return (
    <p className="text-sm font-medium text-[#3B82F6]">
      {count > 0 ? `${count} personas ya en lista` : 'Sé el primero en unirte'}
    </p>
  )
}

function FormSection() {
  return (
    <div className="w-full max-w-md">
      <Suspense fallback={null}>
        <WaitlistForm />
      </Suspense>
      <Suspense fallback={<p className="mt-3 text-sm text-gray-400">Cargando…</p>}>
        <div className="mt-3 flex justify-center">
          <WaitlistCount />
        </div>
      </Suspense>
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* S0 Navbar */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center px-4 sm:px-6">
          <span className="text-xl font-bold text-[#1E3A8A]">Plazi</span>
        </div>
      </header>

      <main>
        {/* S1 Hero */}
        <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-16 text-center sm:px-6 sm:py-24">
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-[#1E3A8A] sm:text-5xl">
            Plazi no es un banco de preguntas. Es el sistema que te lleva a la plaza.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-gray-600">
            Deja de estudiar a ciegas. Plazi te da una ruta hasta el día del examen, recuerda por
            ti lo que se te olvida, y te muestra en todo momento si vas bien.
          </p>
          <FormSection />
        </section>

        {/* S2 Badges */}
        <section className="border-y border-gray-100 bg-gray-50">
          <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-8 gap-y-3 px-4 py-5 sm:px-6">
            {['BOE oficial', 'Exámenes INAP', 'Turno libre C1/C2', 'Gratis para empezar'].map(
              (badge) => (
                <span
                  key={badge}
                  className="text-sm font-semibold uppercase tracking-wide text-[#1E3A8A]"
                >
                  {badge}
                </span>
              )
            )}
          </div>
        </section>

        {/* S3 Problema */}
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-[#1E3A8A] sm:text-4xl">
              El problema no es que no estudies suficiente.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              La mayoría de opositores estudian durante meses sin saber si van bien. Sin un sistema
              que recuerde por ellos lo que están olvidando. Sin una ruta clara hacia el día del
              examen. Plazi es esa ruta.
            </p>
          </div>
        </section>

        {/* S4 Solución */}
        <section className="bg-[#1E3A8A]">
          <div className="mx-auto grid max-w-5xl gap-px px-0 sm:grid-cols-3">
            {[
              {
                title: 'Estudia',
                body: 'Preguntas del BOE real, exámenes INAP. Solo lo que entra.',
              },
              {
                title: 'No olvides',
                body: 'El sistema programa lo que necesitas repasar automáticamente.',
              },
              {
                title: 'Sabe cómo vas',
                body: 'Cada día sabes qué temas dominas, cuáles flojos, cuánto te queda.',
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-3 bg-[#1E3A8A] px-8 py-10">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-base leading-relaxed text-blue-200">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* S5 Diferenciador */}
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-[#1E3A8A] sm:text-4xl">
              Tests ilimitados. Sin paywall. Sin trampa.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              Empieza gratis y accede a todos los temas sin límite. El plan de pago existe para
              quien quiere más — nunca para quitarte lo que ya tienes.
            </p>
          </div>
        </section>

        {/* S6 Historia */}
        <section className="border-y border-gray-100 bg-gray-50 px-4 py-16 sm:px-6">
          <blockquote className="mx-auto max-w-2xl text-center text-xl italic leading-relaxed text-gray-600">
            "El problema no es que los opositores no trabajen duro. El problema es que estudian sin
            saber si van bien. Sin un sistema que recuerde por ellos. Sin una ruta clara hacia el
            día del examen. Plazi es esa ruta."
          </blockquote>
        </section>

        {/* S7 CTA final */}
        <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-16 text-center sm:px-6 sm:py-24">
          <h2 className="max-w-xl text-3xl font-bold text-[#1E3A8A] sm:text-4xl">
            Tu plaza empieza aquí.
          </h2>
          <p className="max-w-md text-lg text-gray-600">
            Únete a la lista. Acceso anticipado gratuito para los primeros.
          </p>
          <FormSection />
        </section>
      </main>

      {/* S8 Footer */}
      <footer className="border-t border-gray-100">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-gray-400 sm:px-6">
          <span>© 2026 PadaniCloud</span>
          <nav className="flex gap-4">
            <Link href="/legal/privacidad" className="hover:text-gray-600 transition">
              Política de privacidad
            </Link>
            <Link href="/legal/aviso" className="hover:text-gray-600 transition">
              Aviso legal
            </Link>
          </nav>
        </div>
      </footer>
    </>
  )
}
