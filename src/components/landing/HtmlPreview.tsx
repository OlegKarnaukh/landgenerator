'use client';

import { useEffect, useRef } from 'react';

interface HtmlPreviewProps {
  html: string;
  className?: string;
}

export function HtmlPreview({ html, className = '' }: HtmlPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && html) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;

      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }
    }
  }, [html]);

  return (
    <iframe
      ref={iframeRef}
      className={`w-full h-full border-0 ${className}`}
      title="Landing Preview"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
