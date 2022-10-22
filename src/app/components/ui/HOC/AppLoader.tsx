import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../../store";
import { loadBookingsList } from "../../../store/bookings";
import { loadLikesList } from "../../../store/likes";
import { loadReviewsList } from "../../../store/reviews";
import { loadRoomsList } from "../../../store/rooms";
import { getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from "../../../store/users";

const AppLoader = (props: { children: any }) => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const usersStatusLoading = useSelector(getUsersLoadingStatus());

    useEffect(() => {
        loadUsersList()(dispatch);
        loadRoomsList()(dispatch);
        loadLikesList()(dispatch);
        loadReviewsList()(dispatch);
        loadBookingsList()(dispatch, store.getState);
    }, [isLoggedIn]);


    if (!usersStatusLoading) {
        return props.children;
    } else {
        return <></>;
    }
}

export default AppLoader