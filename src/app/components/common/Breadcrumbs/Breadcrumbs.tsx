import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';

import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';
import { privateRoutes, publicRoutes } from '../../../router/routes';
import { getRoomById } from '../../../store/rooms';
import { getUserById } from '../../../store/users';
import translations from '../../../utils/translations';


export const RoomBreadcrumb: React.FC<any> = ({ match }) => {
    const room = useSelector(getRoomById(match.params.roomId));
    return <span>اتاق شماره ی {room?.roomNumber}</span>;
}

export const UserBreadcrumb: React.FC<any> = ({ match }) => {
    const user = useSelector(getUserById(match.params.userId));
    if (user) {
        return <span>پروفایل {`${user?.firstName} ${user?.secondName}`}</span>;
    }
    return <span>کاربر پیدا نشد</span>;
};

export const ProfileBreadcrumb: React.FC<any> = ({ match }) => {
    if (match.params.route) {
        return <span>{translations(match.params.route)}</span>;
    }
    return <span>مسیر پیدا نشد</span>;
};


const Breadcrumbs = () => {
    const breadcrumbs = useReactRouterBreadcrumbs([...publicRoutes, ...privateRoutes]);

    return (
        <div className='breadcrumbs'>
            <MuiBreadcrumbs aria-label="breadcrumb">
                {
                    breadcrumbs.map(({ match, breadcrumb }, index) => {
                        const last = index === breadcrumbs.length - 1;
                        return (
                            last ?
                                <span key={match.pathname}>
                                    <NavLink className='breadcrumbs-item--last' to={match.pathname}>{breadcrumb}</NavLink>
                                </span>
                                :
                                <span key={match.pathname}>
                                    <NavLink className='breadcrumbs-item' to={match.pathname}>{breadcrumb}</NavLink>
                                </span>
                        );
                    })
                }
            </MuiBreadcrumbs>
        </div>
    );
};

export default Breadcrumbs;