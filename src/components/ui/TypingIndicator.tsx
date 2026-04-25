import React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 p-3 bg-muted rounded-2xl rounded-tl-none w-fit">
      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}

################################################################################