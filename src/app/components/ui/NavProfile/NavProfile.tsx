import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentUserData, logOut } from '../../../store/users';
import Avatar from '../../common/Avatar';
import Tooltip from '../../common/Tooltip';

const NavProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(getCurrentUserData());

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleClickSettingsMenu = (path: string) => {
        navigate(path);
        handleCloseUserMenu();
    };

    const handleLogOut = () => {
        logOut()(dispatch).then(() => {
            navigate('/');
        });
    };

    if (currentUser) {
        const { avatarPhoto, firstName, secondName } = currentUser;
        return (
            <div className='profile-wrapper'>
                <Tooltip title='منو را باز کنید' placement='bottom'>
                    <IconButton onClick={handleOpenUserMenu} className='profile-avatar__btn'>
                        <Avatar alt='user-photo' src={avatarPhoto || ''} />
                    </IconButton>
                </Tooltip>
                <div className='profile-username__wrapper'>
                    <span className='profile-username__greeting'>خوش آمدی</span>
                    <div className='profile-username__name'>{`${firstName} ${secondName}`}</div>
                </div>
                <Menu
                    anchorEl={anchorElUser}
                    keepMounted
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    className='profile-menu'
                >
                    <MenuItem
                        className='profile-menu__item'
                        onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}`)}
                    >
                        <AccountCircleIcon />
                        مشخصات
                    </MenuItem>
                    {currentUser.role === 'admin' && (
                        <MenuItem
                            className='profile-menu__item'
                            onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}/dashboard`)}
                        >
                            <AdminPanelSettingsIcon />
                            پنل مدیریت
                        </MenuItem>
                    )}
                    <MenuItem
                        className='profile-menu__item'
                        onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}/booking`)}
                    >
                        <StarBorderIcon />
                        رزروهای من
                    </MenuItem>
                    <MenuItem
                        className='profile-menu__item'
                        onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}/likes`)}
                    >
                        <FavoriteBorderIcon />
                        علاقمندی ها
                    </MenuItem>
                    <MenuItem
                        className='profile-menu__item'
                        onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}/favorites`)}
                    >
                        <BookmarkBorderIcon />
                        ذخیره شده ها
                    </MenuItem>
                    <MenuItem className='profile-menu__item' onClick={handleLogOut}>
                        <ExitToAppIcon />
                        خروج
                    </MenuItem>
                </Menu>
            </div>
        );
    }
    return <>صبور باشید</>;
};

export default NavProfile;
