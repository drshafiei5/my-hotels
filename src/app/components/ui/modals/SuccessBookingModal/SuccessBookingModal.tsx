import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DialogContent, DialogActions } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../common/Button';
import Modal from '../../../common/Modal';
import { getCurrentUserId } from '../../../../store/users';
import { BookingType } from '../../../../types/types';
import { format } from 'date-fns-jalali';
import { useNavigate } from 'react-router-dom';

type SuccessBookingModalProps = {
  open: boolean;
  onClose: () => void;
  isLoading: boolean;
  bookingData: BookingType;
};

const SuccessBookingModal: React.FC<SuccessBookingModalProps> = ({ open, onClose, isLoading, bookingData }) => {
  const navigate = useNavigate();
  const currentUserId = useSelector(getCurrentUserId());
  const dateArrival = format(new Date(bookingData?.arrivalDate || ''), 'dd LLLL yyyy');
  const dateDeparture = format(new Date(bookingData?.departureDate || ''), 'dd LLLL yyyy');

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoMyBooking = () => {
    navigate(`/profile/${currentUserId}/booking`);
  };

  return (
    <Modal title='رزرو اتاق' open={open} onClose={onClose} isLoading={isLoading}>
      <DialogContent>
        <div className='booking-modal__text'>
          <h2>اتاق با موفقیت رزرو شد</h2>
          <CheckCircleIcon className='booking-modal__text-icon' />
        </div>
        <table className='booking-modal__info'>
          <tbody>
            <tr>
              <td className='booking-modal__info-dateText'>تاریخ ورود:</td>
              <td className='booking-modal__info-date'>{dateArrival}</td>
            </tr>
            <tr>
              <td className='booking-modal__info-dateText'>تاریخ خروج:</td>
              <td className='booking-modal__info-date'>{dateDeparture}</td>
            </tr>
          </tbody>
        </table>
      </DialogContent>
      <DialogActions className='booking-modal__actions'>
        <Button onClick={handleGoBack}>بازگشت</Button>
        <Button onClick={handleGoMyBooking} variant='outlined'>
          رزروهای من
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default React.memo(SuccessBookingModal);
