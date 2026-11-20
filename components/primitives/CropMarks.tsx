import React from 'react';

export interface CropMarksProps {
  children: React.ReactNode;
  className?: string;
  size?: number; // Size of corner marks in pixels
}

export const CropMarks: React.FC<CropMarksProps> = ({
  children,
  className = '',
  size = 14,
}) => {
  return (
    <div className={`relative p-3 ${className}`}>
      {/* Top Left */}
      <span
        style={{ width: size, height: size }}
        className="absolute top-0 left-0 border-t-2 border-l-2 border-[--accent] pointer-events-none"
        aria-hidden="true"
      />
      {/* Top Right */}
      <span
        style={{ width: size, height: size }}
        className="absolute top-0 right-0 border-t-2 border-r-2 border-[--accent] pointer-events-none"
        aria-hidden="true"
      />
      {/* Bottom Left */}
      <span
        style={{ width: size, height: size }}
        className="absolute bottom-0 left-0 border-b-2 border-l-2 border-[--accent] pointer-events-none"
        aria-hidden="true"
      />
      {/* Bottom Right */}
      <span
        style={{ width: size, height: size }}
        className="absolute bottom-0 right-0 border-b-2 border-r-2 border-[--accent] pointer-events-none"
        aria-hidden="true"
      />
      {children}
    </div>
  );
};
