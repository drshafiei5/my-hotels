import { Paper } from '@mui/material';
import { format } from 'date-fns-jalali';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeBooking } from '../../../../store/bookings';
import { getRoomById, removeBookingRoom } from '../../../../store/rooms';
import { BookingType } from '../../../../types/types';
import Button from '../../../common/Button';
import { getGuestsLabel } from '../../GuestsCounter/GuestsCounter';
import RoomCard from '../../rooms/RoomCard';

const BookingCard: React.FC<BookingType> = ({
  _id,
  arrivalDate,
  departureDate,
  adults,
  children,
  babies,
  totalPrice,
  roomId,
}) => {
  const dispatch = useDispatch();
  const room = useSelector(getRoomById(roomId));

  const handleRemoveBooking = () => {
    removeBooking(_id)(dispatch);
    removeBookingRoom({ roomId, _id: _id || '' })(dispatch);
  };

  return (
    <Paper className='booking-card'>
      <div className='booking-card__wrapper'>
        <div className='booking-content'>
          <h2>
            شماره رزرو <span>{_id}</span>
          </h2>
          <h3 className='booking-info__title'>اطلاعات رزرو</h3>
          <table className='booking-info'>
            <tbody className='booking-info__body'>
              <tr className='booking-info__item'>
                <td>تاریخ ورود:</td>
                <td>
                  {format(new Date(arrivalDate || ''), 'dd LLLL yyyy')}
                </td>
              </tr>
              <tr className='booking-info__item'>
                <td>تاریخ خروج:</td>
                <td>
                  {format(new Date(departureDate || ''), 'dd LLLL yyyy')}
                </td>
              </tr>
              <tr className='booking-info__item'>
                <td>تعداد مهمان ها:</td>
                <td>
                  <span>{getGuestsLabel(adults, children, babies)}</span>
                </td>
              </tr>
              <tr className='booking-info__item'>
                <td>هزینه رزرو:</td>
                <td>
                  <span>{`${totalPrice}`} تومان</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='booking-card__btns'>
          <div style={{ width: '100%' }}>
            <RoomCard
              _id={room?._id || 'id not found'}
              roomNumber={room?.roomNumber || 'not found'}
              price={room?.price || 0}
              type={room?.type}
              images={room?.images}
              comforts={room?.comforts}
            />
          </div>
          <Link to={`/rooms/${roomId}`}>
            <Button size='small' fullWidth>
              صفحه ی اتاق رزرو شده
            </Button>
          </Link>
          <Button size='small' variant='outlined' color='error' onClick={handleRemoveBooking}>
            کنسلی رزرو
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default BookingCard;
