import { Suspense } from 'react'
import Link from 'next/link'
import { Analytics } from '@/components/Analytics'
import { HeroFormCard } from '@/components/HeroFormCard'
import { DemoPhone } from '@/components/DemoPhone'
import { FAQList } from '@/components/FAQList'
import { StickyBar } from '@/components/StickyBar'
import { WaitlistForm } from '@/components/WaitlistForm'
import { getHeroQuestions } from '@/lib/waitlist'

export default async function Home() {
  const questions = await getHeroQuestions()

  return (
    <>
      <Analytics />
      <StickyBar />

      {/* Nav */}
      <nav>
        <div className="wrap nav-inner">
          <div className="logo">plazi</div>
          <div className="nav-badge">
            <span className="pulse" />
            Acceso anticipado · verano 2026
          </div>
        </div>
      </nav>

      {/* S1 Hero */}
      <section className="hero" id="top">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">
                <span className="pulse" />
                Lista de admitidos · Acceso anticipado
              </div>
              <h1>
                Plazi no es un banco de preguntas.<br />
                <em>Es el sistema que te acerca cada día a tu plaza de funcionario.</em>
              </h1>
              <p className="hero-sub">
                Deja de estudiar a ciegas. Plazi te da una ruta diaria, te hace recordar lo aprendido
                antes de que se te olvide, y te muestra en todo momento si estás cerca del éxito.
              </p>
              <div className="timing-pill">
                📅 Acceso anticipado · verano 2026 · Lanzamiento septiembre 2026
              </div>
            </div>
            <HeroFormCard />
          </div>
        </div>
      </section>

      {/* Trust row */}
      <div className="trust-row">
        <span className="trust-item"><strong>+15.000</strong>&nbsp;preguntas del BOE oficial</span>
        <span className="trust-item">Exámenes reales del INAP</span>
        <span className="trust-item">C1 y C2 AGE · Turno libre</span>
        <span className="trust-item">Gratis para empezar</span>
      </div>

      {/* Claim brutal */}
      <div className="claim-brutal">
        <div className="wrap">
          <h2>Sin cuotas. Sin sorpresas. <span>Tests sin límites.</span></h2>
          <p>Mientras otras apps te cortan el acceso al llegar al límite, en Plazi el free es de verdad.</p>
          <div className="vs-row">
            <span className="vs-item vs-bad">OpositaTest: 20 tests/día gratis</span>
            <span className="vs-item vs-bad">GoKoan: contenido bloqueado</span>
            <span className="vs-item vs-good">Plazi: ilimitado siempre</span>
          </div>
        </div>
      </div>

      {/* S3 Problema */}
      <section className="s">
        <div className="wrap">
          <div className="prob-grid">
            <div>
              <div className="sec-label">El problema</div>
              <h2 className="sec-h2">No es que no estudies suficiente.</h2>
              <p className="sec-sub">
                Es que estudias sin saber si vas bien. Sin una ruta. Sin que nadie recuerde por ti
                lo que estás olvidando. Y con recursos que nadie garantiza que estén actualizados.
              </p>
            </div>
            <div className="pain-list">
              {[
                { icon: '😰', title: 'No sé por dónde empezar', body: 'El temario es enorme y no hay un orden claro. Cada día empieza desde cero.' },
                { icon: '📉', title: 'Estudio mucho y no avanzo', body: 'Sin sistema, sin método. El esfuerzo no se traduce en progreso visible.' },
                { icon: '❓', title: 'No sé si voy bien', body: 'Nadie te dice cuánto te queda ni si lo que estás haciendo funciona.' },
                { icon: '⚠️', title: '¿Esto está actualizado?', body: 'Apuntes de foros, PDFs de terceros, normativa que pudo cambiar. Sin saber qué versión estudiar.' },
              ].map((item) => (
                <div key={item.title} className="pain-item">
                  <div className="pain-icon">{item.icon}</div>
                  <div className="pain-text">
                    <strong>{item.title}</strong>
                    {item.body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA banner 1 */}
      <div className="cta-banner">
        <div className="wrap">
          <p>¿Te suena familiar? Apúntate ahora — cuando lancemos, tendrás todo incluido desde el primer día, sin coste.</p>
          <a href="#form" className="btn-inline">Quiero acceso anticipado →</a>
        </div>
      </div>

      {/* S4 Beta benefits + mockup */}
      <section className="s">
        <div className="wrap">
          <div className="sec-label">Lo que consigues</div>
          <h2 className="sec-h2">Todos los apuntados entran con acceso completo, gratis.</h2>
          <p className="sec-sub">Sin restricciones. El ranking decide quién mantiene estos beneficios cuando lancemos al público.</p>
          <div className="beta-grid">
            {[
              { title: '+15.000 preguntas del BOE oficial', body: 'Extraídas directamente de las leyes con trazabilidad al artículo exacto. Solo lo que entra en tu convocatoria.' },
              { title: 'Exámenes reales del INAP incluidos', body: 'Practica con las preguntas de convocatorias reales, identificadas con badge "Pregunta INAP".' },
              { title: 'Ruta diaria personalizada', body: 'Cada día sabrás exactamente qué repasar y cuánto tiempo necesitas. Sin parálisis, sin improvisar.' },
              { title: 'Normativa siempre actualizada', body: 'El sistema se sincroniza con el BOE. Nunca estudies una ley derogada o desactualizada.' },
            ].map((item) => (
              <div key={item.title} className="beta-item">
                <div className="beta-check">✓</div>
                <div className="beta-content">
                  <strong>{item.title}</strong>
                  <span>{item.body}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="beta-more">
            ✦ Y mucho más en camino — análisis de fallos, porcentaje estimado de éxito, simulacros ilimitados, psicotécnicos y funciones que diseñaremos juntos.
          </div>

          {/* Mockup */}
          <div className="mockup-wrap">
            <div className="mockup-text">
              <div className="sec-label">Contenido verificable</div>
              <h2 className="sec-h2" style={{ fontSize: 'clamp(18px,2.5vw,26px)' }}>
                Cada pregunta, con su artículo. Verificable al momento.
              </h2>
              <p>
                No son preguntas inventadas ni sacadas de apuntes de foros. Cada respuesta incluye
                el artículo exacto del BOE del que proviene.
              </p>
              <ul>
                <li>CE · EBEP · Ley 39/2015 LPAC · Ley 40/2015 LRJSP</li>
                <li>LOPD · Transparencia · Igualdad · LGTBI y más</li>
                <li>Corpus completo C1 y C2 AGE — actualizado al BOE vigente</li>
              </ul>
            </div>
            <div>
              <DemoPhone questions={questions} />
              <p className="phone-note">Demo interactiva · pulsa una respuesta</p>
            </div>
          </div>
        </div>
      </section>

      {/* S5 Cómo funciona */}
      <section className="s">
        <div className="wrap">
          <div className="sec-label">Cómo funciona</div>
          <h2 className="sec-h2">Tu ruta diaria hasta el examen.</h2>
          <div className="sol-grid">
            {[
              { n: '01', h: 'Estudia', p: 'Preguntas del BOE real y exámenes INAP. Solo el contenido que entra en tu convocatoria.' },
              { n: '02', h: 'No olvides', p: 'El sistema programa lo que necesitas repasar automáticamente. Sin que tengas que pensar en ello.' },
              { n: '03', h: 'Sabe cómo vas', p: 'Cada día sabes qué temas dominas, cuáles flojos, y cuánto te queda hasta el examen.' },
              { n: '04', h: 'Normativa viva', p: 'Alertas cuando el BOE cambia. Nunca estudies algo desfasado.' },
            ].map((c) => (
              <div key={c.n} className="sol-card">
                <div className="sol-num">{c.n}</div>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S6 Timeline */}
      <section className="s">
        <div className="wrap">
          <div className="sec-label">El plan</div>
          <h2 className="sec-h2">Simple. Sin letra pequeña.</h2>
          <p className="sec-sub">Todos los apuntados entran con acceso completo gratis. El ranking decide quién lo mantiene cuando lancemos al público.</p>
          <div className="tl">
            <div className="tl-i">
              <div className="tl-d done">✓</div>
              <div>
                <div className="tl-ph">Ahora — Lista de admitidos</div>
                <div className="tl-dt">Abril 2026 →</div>
                <div className="tl-desc">Te apuntas gratis. Subes en el ranking compartiendo tu enlace.</div>
              </div>
            </div>
            <div className="tl-i">
              <div className="tl-d now">●</div>
              <div>
                <div className="tl-ph">Verano 2026 — Acceso anticipado</div>
                <div className="tl-dt">Junio / Julio 2026</div>
                <div className="tl-desc">Todos los de la lista entran.</div>
                <div className="tl-hl">Acceso completo gratis para todos.</div>
              </div>
            </div>
            <div className="tl-i">
              <div className="tl-d future">3</div>
              <div>
                <div className="tl-ph">Septiembre 2026 — Lanzamiento</div>
                <div className="tl-dt">Disponible para todos</div>
                <div className="tl-desc">Top 100 del ranking: acceso completo gratis hasta su próximo examen. El resto: tests ilimitados gratis para siempre.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S7 Ranking */}
      <section className="s">
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div className="sec-label">Ranking</div>
            <h2 className="sec-h2">Sube posiciones. Mantén el acceso completo en septiembre.</h2>
            <p className="sec-sub" style={{ margin: '0 auto', maxWidth: 520 }}>
              Todos entran con acceso completo gratis. El ranking decide quién lo mantiene después. Comparte tu enlace y sube.
            </p>
          </div>
          <div className="lb-wrap">
            <div className="lb-card">
              <div className="lb-hd">
                <span className="lb-hd-t">Ranking · Lista de admitidos</span>
                <span className="lb-hd-s">Top 100 → acceso gratis sep.</span>
              </div>
              <div className="lb-row"><div className="lb-pos gold">#1</div><div className="lb-nm">Car*** M.</div><div className="lb-bg lb-ref">7 referidos</div></div>
              <div className="lb-row"><div className="lb-pos silver">#2</div><div className="lb-nm">Jav*** R.</div><div className="lb-bg lb-ref">5 referidos</div></div>
              <div className="lb-row"><div className="lb-pos bronze">#3</div><div className="lb-nm">Mar*** L.</div><div className="lb-bg lb-ref">4 referidos</div></div>
              <div className="lb-row"><div className="lb-pos" style={{ color: 'var(--muted)' }}>#4</div><div className="lb-nm">Ale*** G.</div><div className="lb-bg lb-ref">3 referidos</div></div>
              <div className="lb-row lb-you"><div className="lb-pos" style={{ color: 'var(--blue)' }}>#28</div><div className="lb-nm">Tú · sin referidos aún</div><div className="lb-bg lb-inv">Invita →</div></div>
              <div className="lb-cta">Tu enlace aparece tras apuntarte. <a href="#form">¿Cómo funciona?</a></div>
            </div>
            <p className="lb-note">
              <strong>Recuerda:</strong> todos los apuntados entran con acceso completo gratis. El top 100 lo mantiene tras el lanzamiento. El resto: tests ilimitados gratis para siempre.
            </p>
          </div>
        </div>
      </section>

      {/* CTA banner 2 */}
      <div className="cta-banner">
        <div className="wrap">
          <p>Apúntate ahora. Acceso completo gratis cuando lancemos. Cuanto antes, mejor posición en el ranking.</p>
          <a href="#form" className="btn-inline">Apuntarme a la lista →</a>
        </div>
      </div>

      {/* S8 Pricing */}
      <section className="s">
        <div className="wrap">
          <div className="sec-label">Planes</div>
          <h2 className="sec-h2">Transparencia total desde el principio.</h2>
          <p className="sec-sub">El free es de verdad. El pago es para quien quiere más, nunca para quitarte lo que ya tienes.</p>
          <div className="pg">
            <div className="pc">
              <div className="pc-name">Free</div>
              <div className="pc-amt">0€</div>
              <div className="pc-per">para siempre · sin tarjeta</div>
              <hr className="pc-div" />
              <ul className="pc-feats">
                <li>Tests ilimitados todos los temas</li>
                <li>Temario C1 y C2 completo</li>
                <li>Exámenes INAP históricos</li>
                <li className="off">Ruta diaria personalizada</li>
                <li className="off">Repaso inteligente</li>
                <li className="off">Simulacros ilimitados</li>
                <li className="off">Análisis de fallos</li>
              </ul>
            </div>
            <div className="pc feat">
              <div className="pc-tag">Más popular</div>
              <div className="pc-name">CORE</div>
              <div className="pc-amt"><sup>€</sup>9,99</div>
              <div className="pc-per">mes · o 79€/año</div>
              <hr className="pc-div" />
              <ul className="pc-feats">
                <li>Todo lo del plan Free</li>
                <li>Ruta diaria personalizada</li>
                <li>Repaso inteligente completo</li>
                <li>Simulacros 1 al mes</li>
                <li>Progreso detallado por tema</li>
                <li className="off">Simulacros ilimitados</li>
                <li className="off">Análisis de fallos avanzado</li>
              </ul>
            </div>
            <div className="pc">
              <div className="pc-name">PRO</div>
              <div className="pc-amt"><sup>€</sup>14,99</div>
              <div className="pc-per">mes · o 119€/año</div>
              <hr className="pc-div" />
              <ul className="pc-feats">
                <li>Todo lo del plan CORE</li>
                <li>Simulacros ilimitados</li>
                <li>Análisis de fallos avanzado</li>
                <li>% estimado de éxito</li>
                <li>Psicotécnicos</li>
                <li>Soporte prioritario</li>
                <li>Funciones nuevas primero</li>
              </ul>
            </div>
          </div>
          <p style={{ marginTop: 14, fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>
            Acceso anticipado: todos con acceso completo gratis. Top 100 del ranking lo mantienen gratis en el lanzamiento.
          </p>
          <div className="eb">
            <div>
              <div className="eb-tag">⚡ Precio fundador</div>
              <h3>¿Prefieres no depender del ranking?</h3>
              <p>
                Todos los apuntados entran con acceso completo gratis. En septiembre solo el top 100
                lo mantiene. Si prefieres asegurarlo sin depender de tu posición, paga una vez y
                bloquea el precio más bajo para siempre.
              </p>
              <ul className="eb-list">
                <li>Acceso completo gratis durante el periodo anticipado</li>
                <li>Precio más bajo garantizado tras el lanzamiento</li>
                <li>Independiente de tu posición en el ranking</li>
                <li>Devolución completa en 14 días si cambias de opinión</li>
              </ul>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button className="btn-eb">
                59€ · Precio fundador
                <small>Pago único · Sin suscripción</small>
              </button>
              <p className="eb-legal">Factura disponible · Derecho de desistimiento 14 días</p>
            </div>
          </div>
        </div>
      </section>

      {/* S9 FAQ */}
      <section className="s">
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 6 }}>
            <div className="sec-label">Preguntas frecuentes</div>
            <h2 className="sec-h2">Todo lo que necesitas saber.</h2>
          </div>
          <FAQList />
        </div>
      </section>

      {/* S10 Final CTA */}
      <section className="s" style={{ borderBottom: 'none' }}>
        <div className="wrap">
          <div className="cta-box">
            <h2>Tu plaza empieza aquí.</h2>
            <p>Apúntate ahora. Acceso completo gratis cuando lancemos. Sube en el ranking para mantenerlo.</p>
            <div className="cta-form">
              <Suspense fallback={null}>
                <WaitlistForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="wrap foot-inner">
          <span>© 2026 PadaniCloud · plazi.es</span>
          <nav className="foot-links">
            <Link href="/legal/privacidad">Política de privacidad</Link>
            <Link href="/legal/aviso">Aviso legal</Link>
            <Link href="/legal/condiciones">Condiciones de uso</Link>
          </nav>
        </div>
      </footer>
    </>
  )
}
