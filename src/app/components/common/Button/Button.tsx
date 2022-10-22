import { Button as MuiButton, ButtonProps } from '@mui/material';
import React from 'react';



const Button: React.FC<ButtonProps> = ({ size, color, variant, onClick, children, ...rest }) => {
  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      {...rest}
    >
      {children}
    </MuiButton >
  );
};

export default Button;
