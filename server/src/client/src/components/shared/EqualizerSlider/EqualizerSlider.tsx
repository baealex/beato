import { ChangeEvent } from 'react';
import styles from './EqualizerSlider.module.scss';

interface EqualizerSliderProps {
  name: string;
  value: number;
  min?: string;
  max?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EqualizerSlider = ({ 
  name, 
  value, 
  min = "-10", 
  max = "10", 
  onChange 
}: EqualizerSliderProps) => {
  // Format the display name (e.g., "lowMid" -> "Low Mid")
  const displayName = name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());

  return (
    <div className={styles.sliderRow}>
      <span className={styles.label}>{displayName}</span>
      <input
        className={styles.sliderInput}
        type="range"
        name={name}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
      <span className={styles.valueDisplay}>{value}</span>
    </div>
  );
};

export default EqualizerSlider;
