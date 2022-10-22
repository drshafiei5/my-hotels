import { NavLink } from 'react-router-dom';
import { MenuItem, MenuList } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useSelector } from 'react-redux';
import { getCurrentUserData } from '../../../store/users';

const Sidebar = () => {
  const currentUser = useSelector(getCurrentUserData());

  return (
    <MenuList className='sidebar'>
      <MenuItem component={NavLink} className='sidebar-menu__item' to={`/profile/${currentUser?._id}`}>
        <AccountCircleIcon />
        پروفایل من
      </MenuItem>

      {
        currentUser?.role === 'admin' && (
          <MenuItem
            component={NavLink}
            className='sidebar-menu__item'
            to={`/profile/${currentUser?._id}/dashboard`}
          >
            <AdminPanelSettingsIcon />
            پنل مدیریت
          </MenuItem>
        )
      }

      <MenuItem component={NavLink} className='sidebar-menu__item' to={`/profile/${currentUser?._id}/booking`} >
        <StarBorderIcon />
        رزروهای من
      </MenuItem>

      <MenuItem component={NavLink} className='sidebar-menu__item' to={`/profile/${currentUser?._id}/likes`} >
        <FavoriteBorderIcon />
        علاقه مندی ها
      </MenuItem>

      <MenuItem component={NavLink} className='sidebar-menu__item' to={`/profile/${currentUser?._id}/favorites`} >
        <BookmarkBorderIcon />
        ذخیره شده ها
      </MenuItem>

      <MenuItem className='sidebar-menu__item' component={NavLink} to={`/profile/${currentUser?._id}/edit`}>
        <SettingsIcon />
        ویرایش پروفایل
      </MenuItem>
    </MenuList>
  );
};

export default Sidebar;
