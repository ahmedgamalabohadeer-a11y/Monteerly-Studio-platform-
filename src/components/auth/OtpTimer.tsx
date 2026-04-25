'use client';
import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

export function OtpTimer({ initialSeconds = 60, onResend }: { initialSeconds?: number; onResend: () => void }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  const handleResend = () => {
    onResend();
    setSeconds(initialSeconds);
  };

  return (
    <div className="text-center mt-4">
      {seconds > 0 ? (
        <p className="text-sm text-muted-foreground">
          يمكنك إعادة الإرسال خلال <span className="font-bold text-primary font-mono">00:{seconds < 10 ? `0${seconds}` : seconds}</span>
        </p>
      ) : (
        <button 
          onClick={handleResend}
          className="flex items-center gap-2 mx-auto text-sm font-bold text-primary hover:underline"
        >
          <RefreshCw size={14} /> إعادة إرسال الرمز
        </button>
      )}
    </div>
  );
}

################################################################################