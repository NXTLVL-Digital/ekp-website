import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Hr,
  Section as EmailSection,
  Preview,
} from '@react-email/components'

interface InquiryNotificationProps {
  name: string
  email: string
  phone?: string
  serviceType: string
  gradYear?: string
  highSchool?: string
  message: string
}

const serviceLabels: Record<string, string> = {
  senior: 'Senior Portraits',
  family: 'Family Portraits',
  other: 'Other / Not Sure',
}

export default function InquiryNotification({
  name,
  email,
  phone,
  serviceType,
  gradYear,
  highSchool,
  message,
}: InquiryNotificationProps) {
  const label = serviceLabels[serviceType] ?? serviceType

  return (
    <Html>
      <Head />
      <Preview>
        New {label.toLowerCase()} inquiry from {name}
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={header}>Emily Kathryn Photography</Heading>
          <Hr style={divider} />

          <Heading as="h2" style={subheading}>
            New Inquiry Received
          </Heading>

          <EmailSection style={detailSection}>
            <Text style={fieldLabel}>Name</Text>
            <Text style={fieldValue}>{name}</Text>

            <Text style={fieldLabel}>Email</Text>
            <Text style={fieldValue}>{email}</Text>

            {phone && (
              <>
                <Text style={fieldLabel}>Phone</Text>
                <Text style={fieldValue}>{phone}</Text>
              </>
            )}

            <Text style={fieldLabel}>Service Type</Text>
            <Text style={fieldValue}>{label}</Text>

            {serviceType === 'senior' && gradYear && (
              <>
                <Text style={fieldLabel}>Graduation Year</Text>
                <Text style={fieldValue}>{gradYear}</Text>
              </>
            )}

            {serviceType === 'senior' && highSchool && (
              <>
                <Text style={fieldLabel}>High School</Text>
                <Text style={fieldValue}>{highSchool}</Text>
              </>
            )}
          </EmailSection>

          <Hr style={divider} />

          <Text style={fieldLabel}>Message</Text>
          <Text style={messageText}>{message}</Text>

          <Hr style={divider} />

          <Text style={footer}>
            Reply directly to this email to respond to {name} at {email}.
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

const subheading: React.CSSProperties = {
  color: '#1a1a1a',
  fontSize: '18px',
  fontWeight: 600,
  margin: '0 0 20px',
}

const detailSection: React.CSSProperties = {
  margin: '0',
}

const fieldLabel: React.CSSProperties = {
  color: '#737373',
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.05em',
  textTransform: 'uppercase' as const,
  margin: '16px 0 2px',
}

const fieldValue: React.CSSProperties = {
  color: '#1a1a1a',
  fontSize: '16px',
  margin: '0',
}

const messageText: React.CSSProperties = {
  color: '#1a1a1a',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
}

const footer: React.CSSProperties = {
  color: '#737373',
  fontSize: '13px',
  fontStyle: 'italic',
  textAlign: 'center' as const,
  margin: '0',
}
