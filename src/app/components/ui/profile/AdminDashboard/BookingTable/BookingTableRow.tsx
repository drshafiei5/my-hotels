import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { format } from 'date-fns-jalali';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeBooking } from '../../../../../store/bookings';
import { removeBookingRoom } from '../../../../../store/rooms';
import { BookingType } from '../../../../../types/types';
import Tooltip from '../../../../common/Tooltip';
import { getGuestsLabel } from '../../../GuestsCounter/GuestsCounter';

type BookingTableRowProps = {
  row: BookingType;
};

const BookingTableRow: React.FC<BookingTableRowProps> = ({ row }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemoveBooking = () => {
    removeBooking(row._id)(dispatch);
    removeBookingRoom({ roomId: row.roomId, _id: row._id || '' })(dispatch);
  };

  const handleOpenUserPage = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <TableRow>
      <TableCell align='right' component='th' scope='row'>
        {row._id}
      </TableCell>
      <TableCell align='right' component='th' scope='row'>
        {format(new Date(row?.arrivalDate || ''), 'dd LLLL yyyy')}
      </TableCell>
      <TableCell align='right'>
        {format(new Date(row.departureDate || ''), 'dd LLLL yyyy')}
      </TableCell>
      <TableCell align='right'>
        {getGuestsLabel(row.adults, row.children, row.babies)}
      </TableCell>
      <TableCell align='right'>{row.totalPrice} تومان</TableCell>
      <TableCell align='right'>
        <div className='booking-row__btns'>
          <Tooltip title='صفحه کاربر' disableInteractive={true}>
            <IconButton
              aria-label='expand row'
              size='small'
              color='primary'
              onClick={() => handleOpenUserPage(row.userId || 'not found')}
            >
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='رزرو را لغو کنید' disableInteractive={true}>
            <IconButton
              aria-label='expand row'
              size='small'
              color='error'
              onClick={handleRemoveBooking}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BookingTableRow;
