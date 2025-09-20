import React, { useEffect, useRef, useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  showFallbackCaption?: boolean;
}

export default function SafeImage({ src, alt, className, showFallbackCaption }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isFallback, setIsFallback] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setIsFallback(false);
  }, [src]);

  function handleError() {
    setCurrentSrc('https://cdn.jsdelivr.net/gh/rhenryw/lupine@main/public/tinyTitle.png');
    setIsFallback(true);
  }

  function handleLoad() {
    const el = imgRef.current;
    if (!el) return;
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const w = 10;
      const h = 10;
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(el, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      let total = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        total += lum;
      }
      const avg = total / (w * h);
      if (avg < 8) {
        setCurrentSrc('https://cdn.jsdelivr.net/gh/rhenryw/lupine@main/public/tinyTitle.png');
        setIsFallback(true);
      }
    } catch {}
  }

  const adjustedClass = isFallback && className ? className.replace(/object-cover/g, 'object-contain') : className;
  const style: React.CSSProperties | undefined = isFallback ? { objectFit: 'contain' } : undefined;

  return (
    <div>
      <img ref={imgRef} src={currentSrc} alt={alt} onError={handleError} onLoad={handleLoad} className={adjustedClass} style={style} loading="lazy" decoding="async" />
      {isFallback && showFallbackCaption && (
        <div className="text-center text-xs text-gray-400 mt-1">Whoops! No image yet!</div>
      )}
    </div>
  );
}


