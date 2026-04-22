import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Condiciones de uso — Plazi',
}

export default function CondicionesPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6" style={{ maxWidth: 640, margin: '0 auto', padding: '64px 24px' }}>
      <Link href="/" style={{ fontSize: 13, color: 'var(--blue)', display: 'inline-block', marginBottom: 32 }}>
        ← Volver al inicio
      </Link>

      <h1 style={{ fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>
        Condiciones de uso
      </h1>
      <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 32 }}>Última actualización: abril de 2026</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, color: 'var(--muted2)', lineHeight: 1.7, fontSize: 14 }}>
        <section>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>1. Objeto y aceptación</h2>
          <p>
            Las presentes condiciones regulan el acceso y uso del sitio web <strong style={{ color: 'var(--text)' }}>plazi.es</strong> y del
            servicio Plazi, gestionados por PadaniCloud. Al registrarte en la lista de espera o usar el servicio, aceptas estas condiciones
            en su totalidad.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>2. Descripción del servicio</h2>
          <p>
            Plazi es una plataforma SaaS de preparación de oposiciones AGE (C1 y C2 turno libre) que ofrece tests basados en el
            BOE oficial y exámenes históricos del INAP. Durante la fase de lista de espera, el acceso al servicio no está aún disponible.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>3. Registro en la lista de espera</h2>
          <p>
            El registro es gratuito y no genera ninguna obligación económica. Al registrarte, recibirás comunicaciones relacionadas con el
            lanzamiento del servicio. Puedes darte de baja en cualquier momento escribiendo a{' '}
            <a href="mailto:hola@plazi.es" style={{ color: 'var(--blue)' }}>hola@plazi.es</a>.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>4. Programa de referidos</h2>
          <p>
            El sistema de referidos permite mejorar la posición en el ranking de acceso anticipado. PadaniCloud se reserva el derecho de
            modificar o cancelar el programa en cualquier momento, comunicándolo con antelación razonable a los usuarios registrados.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>5. Precios fundadores</h2>
          <p>
            La oferta de precio fundador (59€ pago único) está sujeta a disponibilidad y puede retirarse en cualquier momento. El derecho de
            desistimiento de 14 días se aplica conforme al Real Decreto Legislativo 1/2007 de defensa de los consumidores y usuarios.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>6. Propiedad intelectual</h2>
          <p>
            El contenido propio de Plazi (estructura, diseño, algoritmos) es propiedad de PadaniCloud. Las preguntas y textos normativos
            procedentes del BOE son de dominio público conforme a la Ley 37/2007 de reutilización de la información del sector público.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>7. Limitación de responsabilidad</h2>
          <p>
            Plazi pone el máximo cuidado en la exactitud del contenido, pero no garantiza que las preguntas reflejen el estado normativo
            vigente en el momento del examen. El usuario es responsable de contrastar la información con las fuentes oficiales.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>8. Ley aplicable</h2>
          <p>
            Estas condiciones se rigen por la ley española. Cualquier controversia se someterá a los juzgados del domicilio del usuario,
            salvo que la normativa establezca un fuero imperativo distinto.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>9. Contacto</h2>
          <p>
            Para cualquier consulta sobre estas condiciones:{' '}
            <a href="mailto:hola@plazi.es" style={{ color: 'var(--blue)' }}>hola@plazi.es</a>
          </p>
        </section>
      </div>
    </div>
  )
}
