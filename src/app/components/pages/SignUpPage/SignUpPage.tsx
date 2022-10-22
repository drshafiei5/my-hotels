import { Paper } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
// import RegisterForm from '../../ui/forms/RegisterForm';

const SignUpPage: React.FC = () => {
  return (
    <>
      <h1 className='visually-hidden'>رزرو هتل</h1>
      <div className='login-form__wrapper'>
        <Paper elevation={3} className='form-card login-form__card'>
          <h2>ثبت نام</h2>
          {/* <RegisterForm /> */}
          <div className='login-form__footer'>
            <span>حساب کاربری دارید؟</span>
            <Link to='/auth/signIn' className='login-form__link'>
              <Button variant='outlined' size='small'>
                ورود
              </Button>
            </Link>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default SignUpPage;
