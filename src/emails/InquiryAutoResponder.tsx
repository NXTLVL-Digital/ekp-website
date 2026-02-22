import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Hr,
  Link,
  Preview,
} from '@react-email/components'

interface InquiryAutoResponderProps {
  name: string
  serviceType: string
}

const serviceDescriptions: Record<string, string> = {
  senior: 'senior portrait',
  family: 'family portrait',
  other: 'photography',
}

export default function InquiryAutoResponder({
  name,
  serviceType,
}: InquiryAutoResponderProps) {
  const description = serviceDescriptions[serviceType] ?? 'photography'

  return (
    <Html>
      <Head />
      <Preview>
        Thank you, {name}! We received your inquiry.
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={header}>Emily Kathryn Photography</Heading>
          <Hr style={divider} />

          <Heading as="h2" style={greeting}>
            Thank you, {name}!
          </Heading>

          <Text style={paragraph}>
            We received your {description} inquiry and are so excited to hear
            from you!
          </Text>

          <Text style={paragraph}>
            Emily will personally review your message and get back to you within
            48 hours. She can&apos;t wait to start planning something beautiful
            together.
          </Text>

          <Text style={paragraph}>
            In the meantime, feel free to{' '}
            <Link href="https://emilykathryn.com/senior-portraits" style={link}>
              browse our portfolio
            </Link>{' '}
            for inspiration.
          </Text>

          <Hr style={divider} />

          <Text style={footer}>
            Emily Kathryn Photography | Gretna, VA
          </Text>
          <Text style={footerSmall}>
            This is an automated confirmation. Please do not reply to this email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const body: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
  fontFamily: 'Georgia, "Times New Roman", serif',
  margin: 0,
  padding: 0,
}

const container: React.CSSProperties = {
  backgroundColor: '#ffffff',
  maxWidth: '600px',
  margin: '40px auto',
  padding: '40px 32px',
  borderRadius: '4px',
}

const header: React.CSSProperties = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: 400,
  letterSpacing: '0.02em',
  textAlign: 'center' as const,
  margin: '0 0 8px',
}

const divider: React.CSSProperties = {
  borderColor: '#c2a36c',
  borderWidth: '1px 0 0',
  margin: '24px 0',
}

const greeting: React.CSSProperties = {
  color: '#1a1a1a',
  fontSize: '22px',
  fontWeight: 600,
  margin: '0 0 16px',
}

const paragraph: React.CSSProperties = {
  color: '#1a1a1a',
  fontSize: '16px',
  lineHeight: '1.7',
  margin: '0 0 16px',
}

const link: React.CSSProperties = {
  color: '#c2a36c',
  textDecoration: 'underline',
}

const footer: React.CSSProperties = {
  color: '#737373',
  fontSize: '13px',
  textAlign: 'center' as const,
  margin: '0 0 4px',
}

const footerSmall: React.CSSProperties = {
  color: '#a3a3a3',
  fontSize: '11px',
  textAlign: 'center' as const,
  margin: '0',
}
