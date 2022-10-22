import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCurrentUserData } from '../../../store/users';
import Sidebar from '../../common/Sidebar';
import ProfileContentProxy from '../../ui/profile/ProfileContentProxy';

const ProfilePage: React.FC = () => {
  const { userId, route } = useParams<{ userId: string; route: string }>();
  const currentUser = useSelector(getCurrentUserData());

  return (
    <div className='profile-page'>
      {
        currentUser?._id === userId && (
          <aside className='profile-sidebar'>
            <Sidebar />
          </aside>
        )
      }

      <ProfileContentProxy
        userId={String(userId)}
        route={String(route)}
      />

    </div>
  );
};

export default ProfilePage;
