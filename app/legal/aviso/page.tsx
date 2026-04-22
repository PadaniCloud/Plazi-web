import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso legal — Plazi',
}

export default function AvisoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Link href="/" className="mb-8 inline-block text-sm text-[#3B82F6] hover:underline">
        ← Volver al inicio
      </Link>

      <h1 className="text-3xl font-bold text-[#1E3A8A]">Aviso legal</h1>
      <p className="mt-2 text-sm text-gray-400">Última actualización: abril de 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="font-semibold text-gray-900">Titular</h2>
          <p className="mt-2">
            <strong>PadaniCloud</strong>
            <br />
            Actividad: Software como servicio (SaaS) para la preparación de oposiciones.
            <br />
            Contacto:{' '}
            <a href="mailto:hola@plazi.es" className="text-[#3B82F6] hover:underline">
              hola@plazi.es
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900">Dominio</h2>
          <p className="mt-2">
            El sitio web accesible en <strong>plazi.es</strong> es titularidad de PadaniCloud.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900">Objeto</h2>
          <p className="mt-2">
            Plazi es una plataforma SaaS española orientada a la preparación de oposiciones de la
            Administración General del Estado (AGE), categorías C1 y C2 (Administrativo y Auxiliar
            Administrativo), en turno libre.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900">Propiedad intelectual</h2>
          <p className="mt-2">
            Todos los contenidos del sitio (textos, diseño, código) son propiedad de PadaniCloud o
            sus licenciantes, salvo los materiales de dominio público procedentes del BOE o del
            INAP. Queda prohibida su reproducción total o parcial sin autorización expresa.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900">Ley aplicable</h2>
          <p className="mt-2">
            Este aviso se rige por la legislación española. Para cualquier controversia, las partes
            se someten a los juzgados y tribunales del domicilio del usuario, salvo que la ley
            disponga un fuero imperativo distinto.
          </p>
        </section>
      </div>
    </div>
  )
}
