import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getCurrentUserData } from '../../../../store/users';
import AdminDashboard from '../AdminDashboard';
import ProfileBooking from '../ProfileBooking';
import ProfileEdit from '../ProfileEdit';
import ProfileFavorites from '../ProfileFavorites';
import ProfileLikes from '../ProfileLikes';
import UserProfile from '../UserProfile';

type ProfileContentProxyProps = {
  userId: string;
  route: string;
  currentUser?: any;
};

const CurrentProfileContent: React.FC<ProfileContentProxyProps> = ({ userId, route, currentUser }) => {
  let component = null;

  switch (route) {
    case 'booking':
      component = currentUser?._id === userId ?
        <ProfileBooking /> : <Navigate to={`/profile/${currentUser?._id}`} />;
      break;

    case 'likes':
      component = currentUser?._id === userId ?
        <ProfileLikes /> : <Navigate to={`/profile/${currentUser?._id}`} />;
      break;

    case 'edit':
      component = currentUser?._id === userId ?
        <ProfileEdit /> : <Navigate to={`/profile/${currentUser?._id}`} />;
      break;

    case 'favorites':
      component = currentUser?._id === userId ?
        <ProfileFavorites /> : <Navigate to={`/profile/${currentUser?._id}`} />;
      break;

    case 'dashboard':
      component = currentUser?.role === 'admin' ?
        <AdminDashboard /> : <Navigate to={`/profile/${currentUser?._id}`} />
      break;

    default:
      break;
  }

  return component || <UserProfile userId={userId} />;
}


const ProfileContentProxy: React.FC<ProfileContentProxyProps> = ({ userId, route }) => {
  const currentUser = useSelector(getCurrentUserData());

  return (
    <>
      {
        !!currentUser?._id &&
        <CurrentProfileContent
          userId={userId}
          route={route}
          currentUser={currentUser}
        />
      }
    </>
  );
};

export default ProfileContentProxy;
