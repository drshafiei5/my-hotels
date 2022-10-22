import { Paper } from '@mui/material';
import React from 'react';
import Container from '../../common/Container';
import { SearchRoomsForm } from '../../ui/forms';

const HomePage: React.FC = () => {
  return (
    <main className='main-home__page'>
      <Container>
        <div className='main-home__wrapper'>
          <h1 className='visually-hidden'>جستجوی هتل</h1>
          <Paper elevation={3} className='form-card searchRooms-form'>
            <h2>ما اتاق های باب میل شما را پیدا می کنیم</h2>
            <SearchRoomsForm />
          </Paper>
          <p className='main__text-wishes'>بهترین اتاق ها برای کار، اوقات فراغت و آرامش شما</p>
        </div>
      </Container>
    </main>
  );
};

export default HomePage;
