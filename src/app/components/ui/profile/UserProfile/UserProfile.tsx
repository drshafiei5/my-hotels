import { Paper } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
// import { useMockData } from '../../../../hooks';
import { getUserById } from '../../../../store/users';
import config from '../../../../config.json';
import { format } from 'date-fns-jalali';

const UserProfile = ({ userId }: { userId: string }) => {
  const currentUser = useSelector(getUserById(userId));

  // const { error, initialize, progress, status } = useMockData();

  const isFireBase = currentUser?.role === 'admin' && config.isFireBase;

  const handleClick = () => {
    // initialize();
  };

  if (currentUser) {
    return (
      <main className='main-profile__page'>
        <h1 className='visually-hidden'>مشخصات کاربر هتل</h1>
        <h2>پروفایل {`${currentUser?.firstName} ${currentUser?.secondName}`}</h2>
        <div className='user-card'>
          <div>
            <img className='user-card__avatarPhoto' src={currentUser?.avatarPhoto} alt='avatarPhoto' />
          </div>
          <Paper className='user-card__content'>
            <p>نام: {currentUser?.firstName}</p>
            <p>نام خانوادگی: {currentUser?.secondName}</p>
            <p>جنسیت: {currentUser?.gender === 'male' ? 'مذکر' : 'مونث'}</p>
            <p>وضعیت: {currentUser?.role === 'admin' ? 'مدیر' : 'کاربر'}</p>
            <p>تاریخ تولد: {format(new Date(currentUser?.birthYear || ''), 'dd LLLL yyyy')}</p>
          </Paper>
        </div>

        {isFireBase && (
          <>
            {/* <h3>Инициализация данных в FireBase</h3>
            <ul>
              <li>Status: {status}</li>
              <li>Progress: {progress}%</li>
              {error && <li>error: {error}</li>}
            </ul>
            <button className='btn btn-primary' onClick={handleClick}>
              Инициализировать
            </button> */}
          </>
        )}
      </main>
    );
  }
  return (
    <main className='main-profile__page'>
      <h1 className='visually-hidden'>مشخصات کاربر هتل</h1>
      <h2>صفحه کاربری پیدا نشد</h2>
    </main>
  );
};

export default UserProfile;
