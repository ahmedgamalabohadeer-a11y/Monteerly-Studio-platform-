'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PaymobSimulatorPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const amount = searchParams.get('amount'); // This will be a string, e.g., "100.50"

  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleTriggerEscrow = async () => {
    if (!token || !amount) {
      setPaymentStatus('failed');
      setResponseMessage('Missing token or amount in URL parameters. Please provide them (e.g., ?token=abc123&amount=100.50).');
      return;
    }

    setPaymentStatus('processing');
    setResponseMessage(null);

    try {
      const amountInCents = Math.round(parseFloat(amount) * 100); // Convert amount to cents and round to avoid float issues

      // Simulate a successful Paymob webhook payload
      // This payload structure is a simplified representation of a real Paymob transaction webhook
      const dummyPayload = {
        obj: {
          id: Math.floor(Math.random() * 10000000) + 1, // Random transaction ID
          pending: false,
          amount_cents: amountInCents,
          success: true, // Simulating a successful payment
          is_auth: true,
          is_capture: true,
          is_voided: false,
          is_refunded: false,
          currency: "EGP", // Assuming EGP, adjust if needed
          merchant_order_id: token, // Using the token as merchant_order_id for traceability
          data: {
            message: "Approved",
            gateway_integration_id: 12345, // Dummy ID
            card_type: "Visa", // Dummy card type
            card_holder_name: "SIMULATED USER",
            txn_response_code: "APPROVED"
          },
          created_at: new Date().toISOString(),
          transaction_processed_callback_url: "http://localhost:3000/api/payments/paymob/webhook" // Dummy callback URL
        },
        type: "TRANSACTION"
      };

      const response = await fetch('/api/payments/paymob/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dummyPayload),
      });

      if (response.ok) {
        const data = await response.json();
        setPaymentStatus('success');
        setResponseMessage(`Payment Confirmed! Webhook response: ${data.message || 'Success'}`);
      } else {
        const errorData = await response.json();
        setPaymentStatus('failed');
        setResponseMessage(`Payment Failed! Webhook error: ${errorData.message || response.statusText}`);
      }
    } catch (error: any) {
      setPaymentStatus('failed');
      setResponseMessage(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="bg-slate-900 p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Paymob Payment Simulator</h1>

        <div className="mb-4 p-4 bg-slate-800 rounded-md">
          <p className="text-lg mb-2">
            <span className="font-semibold text-blue-300">Token:</span> {token || 'N/A'}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-blue-300">Amount:</span> {amount ? `${amount} EGP` : 'N/A'}
          </p>
        </div>

        {paymentStatus === 'idle' && (
          <button
            onClick={handleTriggerEscrow}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!token || !amount || isNaN(parseFloat(amount))}
          >
            تأكيد الدفع (Escrow Trigger)
          </button>
        )}

        {paymentStatus === 'processing' && (
          <div className="text-center py-4">
            <p className="text-xl text-blue-400 animate-pulse">Processing payment...</p>
            <p className="text-sm text-slate-400 mt-2">Sending dummy webhook to /api/payments/paymob/webhook</p>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="text-center py-4">
            <p className="text-xl text-green-400 font-semibold">Payment Confirmed!</p>
            {responseMessage && <p className="text-sm text-slate-300 mt-2">{responseMessage}</p>}
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="text-center py-4">
            <p className="text-xl text-red-400 font-semibold">Payment Failed!</p>
            {responseMessage && <p className="text-sm text-slate-300 mt-2">{responseMessage}</p>}
          </div>
        )}

        {(!token || !amount || isNaN(parseFloat(amount))) && paymentStatus === 'idle' && (
          <p className="text-red-400 text-sm mt-4 text-center">
            Please provide valid 'token' and 'amount' as search parameters (e.g., <code className="bg-slate-800 p-1 rounded">?token=abc123&amount=100.50</code>)
          </p>
        )}
      </div>
    </div>
  );
}