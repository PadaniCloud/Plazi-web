import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de privacidad — Plazi',
}

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Link href="/" className="mb-8 inline-block text-sm text-[#3B82F6] hover:underline">
        ← Volver al inicio
      </Link>

      <h1 className="text-3xl font-bold text-[#1E3A8A]">Política de privacidad</h1>
      <p className="mt-2 text-sm text-gray-400">Última actualización: abril de 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="font-semibold text-gray-900">Responsable del tratamiento</h2>
          <p className="mt-2">
            PadaniCloud, con dominio <strong>plazi.es</strong>. Contacto:{' '}
            <a href="mailto:privacidad@plazi.es" className="text-[#3B82F6] hover:underline">
              privacidad@plazi.es
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900">Datos recogidos</h2>
          <p className="mt-2">
            Al registrarte en la lista de espera recopilamos: nombre, dirección de correo
            electrónico, convocatoria de interés (C1, C2 u Otra) y, de forma opcional, tu
            experiencia previa como opositor.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900">Finalidad y base legal</h2>
          <p className="mt-2">
            Los datos se usan exclusivamente para comunicarte el lanzamiento del servicio Plazi y
            gestionar tu posición en la lista de espera. La base legal es tu consentimiento expreso
            al enviar el formulario (art. 6.1.a RGPD).
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900">Encargado del tratamiento</h2>
          <p className="mt-2">
            Los datos se almacenan en <strong>Supabase, Inc.</strong> con servidores en la Unión
            Europea. Supabase actúa como encargado del tratamiento y está sujeto a las cláusulas
            contractuales tipo de la Comisión Europea.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900">Cesión a terceros</h2>
          <p className="mt-2">
            No cedemos tus datos a ningún tercero con fines comerciales ni publicitarios.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900">Conservación</h2>
          <p className="mt-2">
            Conservamos tus datos mientras el servicio esté en fase de lista de espera o hasta que
            solicites su supresión.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900">Tus derechos</h2>
          <p className="mt-2">
            Puedes ejercer tus derechos de acceso, rectificación, supresión, portabilidad y
            limitación del tratamiento enviando un email a{' '}
            <a href="mailto:privacidad@plazi.es" className="text-[#3B82F6] hover:underline">
              privacidad@plazi.es
            </a>{' '}
            con el asunto "Derechos RGPD". También puedes reclamar ante la Agencia Española de
            Protección de Datos (aepd.es).
          </p>
        </section>
      </div>
    </div>
  )
}
