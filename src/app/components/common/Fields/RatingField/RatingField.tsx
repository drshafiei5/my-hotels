import React, { useState } from 'react';
import Rating from '../../Rating';
import { RatingProps as MuiRatingProps } from '@mui/material';

enum labels {
  'ضعیف' = 1,
  'جالب نبود',
  'متوسط',
  'خوب',
  'عالی',
}

type RatingFieldProps = MuiRatingProps & {
  label?: string;
};

const RatingField: React.FC<RatingFieldProps> = ({ name, label, value, onChange, ...rest }) => {
  const [hover, setHover] = useState(-1);

  return (
    <div className='rating-field'>
      <legend className='rating-label'>{label}</legend>
      <Rating
        name={name}
        value={value}
        {...rest}
        onChange={onChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {
        value !== null &&
        <div className='rating-feedback'>
          {labels[hover !== -1 ? hover : value ? value : 0]}
        </div>
      }
    </div>
  );
};

export default RatingField;
