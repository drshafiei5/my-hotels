import { Slider, SliderProps } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Loader from '../../Loader';
import { InputField } from '..';

const valuetext = (value: number) => {
  return `${value} تومان`;
};

type onChange = {
  target: {
    name?: string;
    value: number[];
  };
};

type RangeSliderFieldProps = SliderProps & {
  label: string;
  description: string;
  minDistance?: number;
  value?: number[];
  onChange: (props: onChange) => void;
};

const RangeSliderField: React.FC<RangeSliderFieldProps> = ({
  label,
  name,
  description,
  onChange,
  value = [],
  min = 0,
  max = 1000,
  minDistance = 1500,
}) => {
  const [sliderValue, setSliderValue] = useState<number[]>(value);

  const handleChange = useCallback(
    (event: Event, newValue: number | number[], activeThumb: number) => {
      if (!Array.isArray(newValue)) {
        return;
      }
      if (newValue[1] - newValue[0] < minDistance) {
        if (activeThumb === 0) {
          const clamped = Math.min(newValue[0], max - minDistance);
          setSliderValue([clamped, clamped + minDistance]);
        } else {
          const clamped = Math.max(newValue[1], minDistance);
          setSliderValue([clamped - minDistance, clamped]);
        }
      } else {
        setSliderValue(newValue);
      }
    },
    [max, minDistance]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'max') {
      onChange({ target: { name, value: [sliderValue[0], +event.target.value] } });
    }
    if (event.target.name === 'min') {
      onChange({ target: { name, value: [+event.target.value, sliderValue[1]] } });
    }
  };

  useEffect(() => {
    setSliderValue(value);
  }, [value]);


  if (value) {
    return (
      <div>
        <div className='rangeSlier-header'>
          <p className='rangeSlider-header__label'>{label || 'Range Slider'}</p>
          <p className='rangeSlider-header__value'>
            {value[0]} تومان - {value[1]} تومان
          </p>
        </div>
        <Slider
          name={name}
          value={sliderValue}
          valueLabelFormat={valuetext}
          onChange={handleChange}
          valueLabelDisplay='auto'
          min={min}
          max={max}
          step={100}
          onChangeCommitted={() => onChange({ target: { name: name || '', value: sliderValue } })}
        />

        <div className='rangeSlider__inputs'>
          <InputField
            inputProps={{ min: min }}
            label='از'
            name='min'
            type='number'
            value={String(value[0])}
            onChange={handleInputChange}
          />
          <InputField
            name='max'
            label='تا'
            type='number'
            inputProps={{ max: max }}
            value={String(value[1])}
            onChange={handleInputChange}
          />
        </div>

        {description && <p className='rangeSlider__description'>هزینه هر شب اقامت در اتاق</p>}
      </div>
    );
  }
  return <Loader />;
};

export default React.memo(RangeSliderField);
