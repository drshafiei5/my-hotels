import { Paper } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { LoginForm } from '../../ui/forms';

const SignInPage: React.FC = () => {
  return (
    <>
      <h1 className='visually-hidden'>رزرو هتل</h1>
      <div className='login-form__wrapper'>
        <Paper elevation={3} className='form-card login-form__card'>
          <h2>ورود</h2>
          <LoginForm />
          <div className='login-form__footer'>
            <span>حساب کاربری ندارید؟</span>
            <Link to='/auth/signUp' className='login-form__link'>
              <Button variant='outlined' size='small'>
                ثبت نام
              </Button>
            </Link>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default SignInPage;
