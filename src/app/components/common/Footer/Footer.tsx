import React from 'react';
import Container from '../Container';
import Divider from '../Divider';
import { InputField } from '../Fields';
import withSubscribe from '../Fields/HOC/withSubscribe';
import Logo from '../Logo';

const Footer = () => {
  const SubscribeInput = withSubscribe(InputField);

  return (
    <footer className='footer'>
      <Container>
        <div className='footer-wrapper'>
          <div className='footer-item footer-item--logo'>
            <div className='footer-logo'>
              <Logo />
              <p className='footer-logo__text'>
                رزرو اتاق در بهترین هتل ها را با تجربه کنید
              </p>
            </div>
          </div>

          <div className='footer-item footer-item--newsletter'>
            <form className='footer-newsletter'>
              <p className='footer-newsletter__title'>عضویت در خبرنامه</p>
              <span>دریافت پیشنهادات ویژه و آخرین اخبار</span>
              <div className='footer-newsletter__input'>
                <SubscribeInput size='small' placeholder='ایمیل را وارد کنید...' name='email' type='email' />
                {/* {withSubscribe(InputField)({ name: 'email', placeholder: 'ایمیل را وارد کنید...' })} */}
              </div>
            </form>
          </div>
        </div>
      </Container>
      <Divider variant='fullWidth' className='footer-divider' />
      <Container>
        <div className='footer-bottom'>
          <p className='footer-copyright'>تمامی حقوق برای مای هتل محفوظ است</p>
          <div className='footer-social'>
            <span className='footer-social__link'>My Hotel</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default React.memo(Footer);
