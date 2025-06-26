import React, { useState } from 'react';
import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingInputProps {
  /** The number of stars to display. */
  count?: number;
  /** The current rating value. */
  value: number;
  /** Callback function that is fired when the rating changes. */
  onChange: (value: number) => void;
  /** The size of the star icons. */
  size?: number;
  /** Optional class name for the container. */
  className?: string;
  /** If true, the rating will be read-only. */
  readOnly?: boolean;
  /** If true, allows half-star ratings. */
  allowHalf?: boolean;
}

const RatingInput: React.FC<RatingInputProps> = ({
  count = 5,
  value,
  onChange,
  size = 24,
  className,
  readOnly = false,
  allowHalf = true,
}) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
  console.log('RatingInput loaded');

  const handleMouseMove = (index: number, event: React.MouseEvent) => {
    if (readOnly) return;
    if (allowHalf) {
      const starElement = event.currentTarget;
      const rect = starElement.getBoundingClientRect();
      const isHalf = event.clientX - rect.left < rect.width / 2;
      setHoverValue(index + (isHalf ? 0.5 : 1));
    } else {
      setHoverValue(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverValue(undefined);
  };

  const handleClick = (index: number, event: React.MouseEvent) => {
    if (readOnly) return;
    let newValue;
    if (allowHalf) {
        const starElement = event.currentTarget;
        const rect = starElement.getBoundingClientRect();
        const isHalf = event.clientX - rect.left < rect.width / 2;
        newValue = index + (isHalf ? 0.5 : 1);
    } else {
        newValue = index + 1;
    }
    onChange(newValue === value ? 0 : newValue); // Allow unsetting rating
  };

  const stars = Array.from({ length: count }, (_, i) => i);
  const displayValue = hoverValue ?? value;

  return (
    <div
      className={cn(
        "flex items-center space-x-1",
        !readOnly && "cursor-pointer",
        className
      )}
      onMouseLeave={handleMouseLeave}
      aria-label={`Rating: ${value} out of ${count} stars.`}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={count}
      aria-valuenow={value}
      aria-readonly={readOnly}
    >
      {stars.map((index) => {
        const starValue = index + 1;
        
        let starIcon;
        if (displayValue >= starValue) {
          starIcon = <Star size={size} className="text-yellow-400 fill-yellow-400 transition-colors" />;
        } else if (allowHalf && displayValue >= starValue - 0.5) {
          starIcon = <StarHalf size={size} className="text-yellow-400 fill-yellow-400 transition-colors" />;
        } else {
          starIcon = <Star size={size} className="text-gray-300 fill-gray-100 transition-colors" />;
        }

        return (
          <div
            key={index}
            onMouseMove={(e) => handleMouseMove(index, e)}
            onClick={(e) => handleClick(index, e)}
            aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
            role="button"
          >
            {starIcon}
          </div>
        );
      })}
    </div>
  );
};

export default RatingInput;