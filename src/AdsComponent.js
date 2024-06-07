import React, { useEffect } from 'react';

const AdsComponent = ({ dataAdSlot }) => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8499995112935035';
    script.async = true;
    script.crossOrigin = 'anonymous';

    // Append script to head
    document.head.appendChild(script);

    // Initialize adsbygoogle
    script.onload = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('Adsbygoogle error:', e);
      }
    };

    // Cleanup on unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-8499995112935035"
      data-ad-slot={dataAdSlot}
      data-ad-format="auto"
      data-full-width-responsive="true">
    </ins>
  );
};

export default AdsComponent;
