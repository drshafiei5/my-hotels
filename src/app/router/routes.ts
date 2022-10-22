import { ProfileBreadcrumb } from './../components/common/Breadcrumbs/Breadcrumbs';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';


import Main from "../layouts/Main";
import Login from "../layouts/Login";
import Rooms from "../layouts/Rooms";
import Profile from "../layouts/Profile";
import { RoomBreadcrumb, UserBreadcrumb } from
    '../components/common/Breadcrumbs/Breadcrumbs';



export type RoutesNavType = {
    path: string;
    name: string;
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    }
};

export const navigationRoutes = [
    { path: '/rooms', name: 'هتل ها' },
    { path: '/services', name: 'خدمات' },
    { path: '/news', name: 'اخبار' },
    { path: '/agreement', name: 'قوانین' },
];

export const publicRoutes = [
    { path: '/', component: Main, breadcrumb: 'خانه' },
    { path: '/auth/:type', component: Login, breadcrumb: 'ورود / ثبت نام' },
    { path: '/rooms', component: Rooms, breadcrumb: 'اتاق های موجود' },
    { path: '/rooms/:roomId/', component: Rooms, breadcrumb: RoomBreadcrumb },
];

export const privateRoutes = [
    { path: '/profile', component: Profile, breadcrumb: 'پروفایل ها' },
    { path: '/profile/:userId', component: Profile, breadcrumb: UserBreadcrumb },
    { path: '/profile/:userId/:route', component: Profile, breadcrumb: ProfileBreadcrumb },
];
