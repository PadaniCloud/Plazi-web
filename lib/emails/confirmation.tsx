import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'

interface ConfirmationEmailProps {
  name: string
  position: number
  own_code: string
}

const referralUrl = (code: string) => `https://plazi.es/?ref=${code}`

export function ConfirmationEmail({ name, position, own_code }: ConfirmationEmailProps) {
  return (
    <Html lang="es">
      <Head />
      <Preview>Ya estás en la lista — Plazi</Preview>
      <Body style={{ backgroundColor: '#ffffff', fontFamily: 'sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '0 auto', padding: '40px 24px' }}>
          <Heading
            style={{ fontSize: '24px', fontWeight: 700, color: '#1E3A8A', marginBottom: '8px' }}
          >
            Plazi
          </Heading>

          <Text style={{ fontSize: '16px', color: '#111827', marginTop: '24px' }}>
            Hola {name},
          </Text>

          <Text style={{ fontSize: '16px', color: '#111827' }}>
            Ya estás dentro. Eres el <strong>#{position}</strong> en la lista.
          </Text>

          <Text style={{ fontSize: '16px', color: '#111827' }}>
            Tu enlace de referido:
          </Text>

          <Link
            href={referralUrl(own_code)}
            style={{ color: '#3B82F6', fontSize: '15px', wordBreak: 'break-all' }}
          >
            {referralUrl(own_code)}
          </Link>

          <Text style={{ fontSize: '16px', color: '#374151', marginTop: '16px' }}>
            Comparte con otros opositores. Cada referido sube tu posición.
          </Text>

          <Text style={{ fontSize: '16px', color: '#374151' }}>
            Te avisaremos cuando abra la beta. Mientras tanto, cada referido cuenta.
          </Text>

          <Hr style={{ borderColor: '#e5e7eb', margin: '32px 0' }} />

          <Text style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center' }}>
            © 2026 PadaniCloud ·{' '}
            <Link href="https://plazi.es" style={{ color: '#9ca3af' }}>
              plazi.es
            </Link>{' '}
            ·{' '}
            <Link href="mailto:hola@plazi.es?subject=Darme de baja" style={{ color: '#9ca3af' }}>
              Darte de baja
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
