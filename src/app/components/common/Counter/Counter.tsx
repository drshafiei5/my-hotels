import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React from 'react';
import Button from '../Button';

type OnChangeProps = {
  target: {
    name: string;
    value: number;
  };
};

type CounterProps = {
  name: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (props: OnChangeProps) => void;
};

const Counter: React.FC<CounterProps> = ({ name, label, value, min, max, onChange }) => {
  const handleIncrease = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    if (+value >= max) return;
    onChange({ target: { name: name, value: Number(value) + 1 } });
  };
  const handleDecrease = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    if (+value <= min) return;
    onChange({ target: { name: name, value: +value - 1 } });
  };

  return (
    <div className='counter-wrapper'>
      {label && <p className='counter-label'>{label}</p>}
      <div className='counter-buttons__wrapper'>
        <Button
          variant='contained'
          size='small'
          color='success'
          aria-label='increase'
          onClick={handleIncrease}
          sx={{
            minWidth: '35px',
            minHeight: '35px',
            borderRadius: '50%',
            padding: '5px'
          }}
        >
          <AddIcon fontSize='small' />
        </Button>

        <input className='counter-input' type='text' value={value} readOnly />

        <Button
          variant='contained'
          size='small'
          color='success'
          aria-label='reduce'
          onClick={handleDecrease}
          sx={{
            minWidth: '35px',
            minHeight: '35px',
            borderRadius: '50%',
            padding: '5px'
          }}
        >
          <RemoveIcon fontSize='small' />
        </Button>
      </div>
    </div>
  );
};

export default Counter;
