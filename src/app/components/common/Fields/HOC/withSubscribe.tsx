import { IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useCallback, useState } from 'react';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material';


const withSubscribe = (Component: React.FC<any>) => (props: MuiTextFieldProps) => {
  const [data, setData] = useState('');

  const handleSubscribe = () => {
    setData('');
    // TODO 2
  };

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setData(event.target.value);
  }, []);


  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    // TODO 1
  };

  return (
    <Component
      {...props}
      onChange={handleChange}
      value={data}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='subscribe'
              onClick={handleSubscribe}
              onMouseDown={handleMouseDown}
              edge='end'
              color='primary'
            >
              <SendIcon color='primary' />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};


export default withSubscribe;