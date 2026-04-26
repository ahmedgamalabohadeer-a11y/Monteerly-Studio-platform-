'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('VISA_MASTER');

  const paymentMethods = [
    { id: 'VISA_MASTER', name: 'بطاقة بنكية', icon: '💳' },
    { id: 'FAWRY', name: 'فوري', icon: '⚡' },
    { id: 'MOBILE_WALLET', name: 'محفظة إلكترونية', icon: '📱' },
    { id: 'PAYPAL', name: 'باي بال', icon: '🌐' },
  ];

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: 'proj_mock_123',
          amount: 5000,
          paymentMethod: selectedMethod,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('حدث خطأ في التوجيه.');
      }
    } catch (err) {
      console.error(err);
      alert('حدث خطأ في الاتصال.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-2xl mx-auto bg-white shadow-lg shadow-blue-500/10 rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">إتمام الدفع</h1>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <p className="text-sm text-blue-600">إجمالي المبلغ</p>
          <p className="text-3xl font-bold text-blue-900">5000 <span className="text-sm">ج.م</span></p>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div 
              key={method.id} 
              onClick={() => setSelectedMethod(method.id)}
              className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${selectedMethod === method.id ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-300'}`}
            >
              <div className="flex items-center">
                <span className="text-2xl ml-4">{method.icon}</span>
                <span className="font-medium text-gray-700">{method.name}</span>
              </div>
            </div>
          ))}
        </div>

        <button 
          disabled={loading}
          onClick={handlePayment}
          className="mt-8 w-full bg-gray-900 text-white py-4 rounded-lg font-bold hover:bg-black transition disabled:bg-gray-300"
        >
          {loading ? 'جاري التوجيه...' : 'تأكيد الدفع' }
        </button>
      </div>
    </div>
  );
}
