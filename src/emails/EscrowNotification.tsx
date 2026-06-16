import * as React from 'react';
import { Html, Body, Head, Heading, Hr, Container, Preview, Section, Text, Button } from '@react-email/components';

interface EscrowEmailProps {
  clientName: string;
  projectId: string;
  amount: number;
}

export default function EscrowNotification({ clientName = 'عميلنا العزيز', projectId = 'PRJ-000', amount = 0 }: EscrowEmailProps) {
  return (
    <Html dir="rtl">
      <Head />
      <Preview>تأكيد إيداع الضمان لمشروعك على Monteerly</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>MONTEERLY STUDIO</Text>
          </Section>
          
          <Section style={content}>
            <Heading style={title}>تم تأمين أموالك بنجاح 🛡️</Heading>
            <Text style={paragraph}>
              مرحباً {clientName}،
            </Text>
            <Text style={paragraph}>
              نؤكد لك أنه تم إيداع مبلغ <strong style={{color: '#4f46e5'}}>${amount}</strong> في حساب الضمان (Escrow) المشفر والخاص بمشروعك رقم ({projectId}).
            </Text>
            <Text style={paragraph}>
              الأموال الآن في أمان ولن يتم تسليمها للمبدع إلا بعد استلامك للعمل النهائي واعتمادك له. يمكنك الآن الانتقال إلى "مساحة العمل" للتواصل اللحظي ومتابعة التقدم.
            </Text>
            
            <Section style={btnContainer}>
              <Button style={button} href={`https://monteerly.com/ar/studio/${projectId}`}>
                الذهاب إلى مساحة العمل
              </Button>
            </Section>
          </Section>

          <Hr style={hr} />
          
          <Section style={footer}>
            <Text style={footerText}>
              Monteerly OS - المنصة السيادية للنخب الإبداعية.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// أنماط CSS المدمجة للقالب
const main = { backgroundColor: '#05050A', fontFamily: 'system-ui, sans-serif' };
const container = { margin: '0 auto', padding: '20px 0 48px', maxWidth: '580px' };
const header = { padding: '24px 24px', backgroundColor: '#0A0A0F', borderBottom: '1px solid #1f2937', borderRadius: '12px 12px 0 0' };
const logo = { fontSize: '20px', fontWeight: 'bold', color: '#ffffff', letterSpacing: '2px', margin: '0' };
const content = { padding: '32px 24px', backgroundColor: '#12121A', borderRadius: '0 0 12px 12px', border: '1px solid #1f2937', borderTop: 'none' };
const title = { fontSize: '24px', fontWeight: 'bold', color: '#ffffff', marginBottom: '24px' };
const paragraph = { fontSize: '16px', lineHeight: '26px', color: '#9ca3af', marginBottom: '16px' };
const btnContainer = { textAlign: 'center' as const, marginTop: '32px' };
const button = { backgroundColor: '#4f46e5', borderRadius: '8px', color: '#fff', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none', textAlign: 'center' as const, display: 'inline-block', padding: '14px 24px' };
const hr = { borderColor: '#1f2937', margin: '24px 0' };
const footer = { padding: '0 24px' };
const footerText = { fontSize: '12px', color: '#6b7280', textAlign: 'center' as const };
