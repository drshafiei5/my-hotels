import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { navigationRoutes } from '../../../router/routes';
import { getAuthErrors, getIsLoggedIn } from '../../../store/users';
import NavProfile from '../../ui/NavProfile';
import Button from '../Button';
import Container from '../Container';
import NavList from '../NavList';
import Divider from '../Divider';
import Logo from '../Logo';

const Header: React.FC = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const authErrors = useSelector(getAuthErrors());

  return (
    <header className='header'>
      <Container>
        <div className='header__inner'>
          <Logo className='header__logo' />
          <NavList routes={navigationRoutes} className='header-nav' />
          {isLoggedIn && !authErrors ? (
            <>
              <Divider orientation='vertical' flexItem className='header__divider' />
              <NavProfile />
            </>
          ) : (
            <div className='header-buttons'>
              <NavLink to='/auth/signIn' className='header-buttons-button'>
                <Button size='small' variant='outlined'>
                  ورود
                </Button>
              </NavLink>
              <NavLink to='/auth/signUp' className='header-buttons-button'>
                <Button size='small'>
                  ثبت نام
                </Button>
              </NavLink>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default React.memo(Header);
