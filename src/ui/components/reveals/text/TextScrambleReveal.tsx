'use client';

import { useRef, useEffect, useState } from 'react';

interface TextScrambleRevealProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
  fontSize?: string;
  lineHeight?: number;
  textColor?: string;
  scrambleColor?: string;
  scrambleChars?: string;
  scrambleSpeed?: number;
  proximityRadius?: number;
  backgroundColor?: string;
  fontFamily?: string;
}

const TextScrambleReveal: React.FC<TextScrambleRevealProps> = ({
  children,
  className = '',
  maxWidth = '800px',
  fontSize = '30px',
  lineHeight = 1.5,
  textColor = '#ffffffb4',
  scrambleColor = '#00c8ff',
  scrambleChars = '.:', 
  scrambleSpeed = 0.5,
  proximityRadius = 100,
  backgroundColor = 'transparent',
  fontFamily = '"Poppins", monospace',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [chars, setChars] = useState<HTMLElement[]>([]);

  
  const scrambleChar = (element: HTMLElement, originalText: string) => {
    const scrambleCharsArray = scrambleChars.split('');
    let iterations = 0;
    const maxIterations = 8;

    const animate = () => {
      if (iterations < maxIterations) {
        const randomChar = scrambleCharsArray[Math.floor(Math.random() * scrambleCharsArray.length)];
        element.textContent = randomChar;
        iterations++;
        setTimeout(animate, 50);
      } else {
        element.textContent = originalText;
        element.classList.remove('scrambling');
        element.style.color = textColor;
      }
    };

    element.classList.add('scrambling');
    element.style.color = scrambleColor;
    console.log(scrambleColor)
    animate();
  };

  useEffect(() => {
    if (!textRef.current) return;

    const textContent = textRef.current.textContent || '';
    const charElements: HTMLElement[] = [];
    
    textRef.current.innerHTML = '';
    
    textContent.split('').forEach((char) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char;
      span.dataset.content = char;
      span.style.display = char === ' ' ? 'inline' : 'inline-block';
      textRef.current?.appendChild(span);
      charElements.push(span);
    });
    
    setChars(charElements);
  }, [children]);

  useEffect(() => {
    if (!containerRef.current || chars.length === 0) return;

    const handlePointerMove = (e: PointerEvent) => {
      chars.forEach(char => {
        const rect = char.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = e.clientX - centerX;
        const y = e.clientY - centerY;
        const distance = Math.sqrt(x * x + y * y);
        
        if (distance < proximityRadius && !char.classList.contains('scrambling')) {
          const originalText = char.dataset.content || char.textContent || '';
          scrambleChar(char, originalText);
        }
      });
    };

    containerRef.current.addEventListener('pointermove', handlePointerMove);

    return () => {
      containerRef.current?.removeEventListener('pointermove', handlePointerMove);
    };
  },[chars, proximityRadius, scrambleChars, scrambleSpeed]);

  return (
    <div 
      ref={containerRef}
      className={`text-scramble ${className}`}
      style={{
        maxWidth,
        fontFamily,
        fontSize,
        lineHeight,
        color: textColor,
        background: backgroundColor,
        userSelect: 'none',
      }}
    >
      <div ref={textRef}>
        {typeof children === 'string' ? children : ''}
      </div>

    </div>
  );
};

export default TextScrambleReveal;
