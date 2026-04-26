import { redirect } from 'next/navigation';

export default function RootPage() {
  // توجيه الزائر فوراً إلى النسخة العربية من المنصة
  redirect('/ar');
}
