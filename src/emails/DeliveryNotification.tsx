import * as React from 'react';
import { Html, Body, Head, Heading, Container, Section, Text, Button, Hr } from '@react-email/components';

export default function DeliveryNotification({ clientName, projectId, projectTitle }: any) {
  return (
    <Html dir="rtl">
      <Head />
      <Body style={{ backgroundColor: '#05050A', fontFamily: 'sans-serif' }}>
        <Container style={{ margin: '0 auto', padding: '20px', maxWidth: '580px' }}>
          <Section style={{ padding: '32px', backgroundColor: '#12121A', borderRadius: '12px', border: '1px solid #1f2937' }}>
            <Heading style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff' }}>تم تسليم مشروعك! 🚀</Heading>
            <Text style={{ fontSize: '16px', color: '#9ca3af' }}>مرحباً {clientName}،</Text>
            <Text style={{ fontSize: '16px', color: '#9ca3af' }}>
              يسعدنا إبلاغك بأن المبدع قام بتسليم مشروعك <strong>{projectTitle}</strong> (المرجع: {projectId}).
            </Text>
            <Section style={{ textAlign: 'center', marginTop: '24px' }}>
              <Button style={{ backgroundColor: '#10b981', borderRadius: '8px', color: '#fff', padding: '12px 20px', fontWeight: 'bold', textDecoration: 'none' }} href={`https://monteerly.com/ar/studio/${projectId}/review`}>
                مراجعة واعتماد التسليم
              </Button>
            </Section>
          </Section>
          <Hr style={{ borderColor: '#1f2937', margin: '24px 0' }} />
          <Text style={{ fontSize: '12px', color: '#6b7280', textAlign: 'center' }}>Monteerly OS - المنصة السيادية للإبداع.</Text>
        </Container>
      </Body>
    </Html>
  );
}
