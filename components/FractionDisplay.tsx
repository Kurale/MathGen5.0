import React from 'react';
import { FractionPart } from '../types';

interface FractionDisplayProps {
  part: FractionPart;
  className?: string;
}

export const FractionDisplay: React.FC<FractionDisplayProps> = ({ part, className = '' }) => {
  return (
    <div className={`inline-flex items-center align-middle font-serif ${className}`}>
      {/* Whole Number Part */}
      {part.whole && part.whole > 0 && (
        <span className="mr-1 text-xl sm:text-2xl font-medium leading-none">
          {part.whole}
        </span>
      )}
      
      {/* Fraction Part */}
      <div className="flex flex-col items-center justify-center mx-1">
        {/* Numerator */}
        <span className="text-lg sm:text-xl font-medium leading-none px-1">
          {part.numerator}
        </span>
        
        {/* Horizontal Bar - Crucial Requirement */}
        <span className="w-full h-[2px] bg-black my-[2px]"></span>
        
        {/* Denominator */}
        <span className="text-lg sm:text-xl font-medium leading-none px-1">
          {part.denominator}
        </span>
      </div>
    </div>
  );
};
