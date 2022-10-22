import React from 'react';
import localStorageService from '../../../../services/localStorage.service';
import { getRoomsByIds } from '../../../../store/rooms';
import { useSelector } from 'react-redux';
import RoomsList from '../../rooms/RoomsList/RoomsList';

const ProfileFavorites = () => {
  const favoritesRoomIds: string[] = JSON.parse(localStorageService.getFavoritesRoom() || '{}');
  const rooms = useSelector(getRoomsByIds(favoritesRoomIds));
  return (
    <div style={{ width: '100%' }}>
      <h1 style={{ marginBottom: '20px' }}>اتاق های موردعلاقه ی من</h1>
      {rooms.length > 0 ? <RoomsList rooms={rooms} /> : <h3>لیست خالی است</h3>}
    </div>
  );
};

export default ProfileFavorites;
