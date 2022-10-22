import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Form, useForm, useModal } from '../../../../hooks';
import { getSearchQueryData, resetSessionStorageData }
  from '../../../../services/sessionStorage.service';
import { createBooking, getBookingCreatedStatus, getBookingsErrors }
  from '../../../../store/bookings';
import { addBookingRoom } from '../../../../store/rooms';
import { getCurrentUserId } from '../../../../store/users';
import { BookingType } from '../../../../types/types';
import Button from '../../../common/Button';
import { DateOfStayField } from '../../../common/Fields';
import GuestsCounter from '../../GuestsCounter';
import { SuccessBookingModal } from '../../modals';
import BookingFormPriceInfo from './BookingFormPriceInfo';
import validatorConfig from './validatorConfig';

const oneDayMs = 86_400_000;

const BookingForm = () => {
  const searchQueryData = getSearchQueryData();

  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('')
  const dispatch = useDispatch();
  const { roomId } = useParams<{ roomId: string }>();
  const currentUserId = useSelector(getCurrentUserId());
  const bookingCreateStatusLoading = useSelector(getBookingCreatedStatus());
  const bookingError = useSelector(getBookingsErrors());
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

  const initialData = {
    arrivalDate: searchQueryData?.arrivalDate || Date.now(),
    departureDate: searchQueryData?.departureDate || Date.now() + oneDayMs,
    adults: searchQueryData?.adults || 1,
    children: searchQueryData?.children || 0,
    babies: searchQueryData?.babies || 0,
    totalPrice: 0,
    userId: currentUserId || 'not found',
    roomId: String(roomId),
  };
  const { data, errors, enterError, handleInputChange, handleResetForm, validate } =
    useForm(initialData, true, validatorConfig);

  const countDays = Math.max(1, Math.round((data.departureDate - data.arrivalDate) / oneDayMs));

  useEffect(() => {
    if (!currentUserId) {
      setError('برای رزرو اتاق وارد شوید');
    }
    if (bookingError) {
      if (bookingError === 'BOOKING_EXIST') {
        setError('اتاق برای تاریخ هایی که انتخاب کرده اید رزرو شده است.');
      }
      if (bookingError === 'На сервере произошла ошибка. Попробуйте позже') {
        setError('اوه، مشکلی پیش آمد، لطفاً بعداً دوباره امتحان کنید.');
      }
    }
  }, [currentUserId, bookingError]);

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (validate(data)) {
      const payload = {
        ...data,
        totalPrice,
      };

      try {
        createBooking(payload)(dispatch).then((bookingData: BookingType) => {
          if (bookingData) {
            addBookingRoom(bookingData)(dispatch).then(() => handleOpenModal());
            resetSessionStorageData();
            handleResetForm(event);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Form data={data} errors={errors} handleChange={handleInputChange}>
        <DateOfStayField onChange={handleInputChange} data={data} errors={errors} />
        <GuestsCounter onChange={handleInputChange} data={data} />
        <BookingFormPriceInfo
          roomId={String(roomId)}
          totalPrice={totalPrice}
          countDays={countDays}
          setTotalPrice={setTotalPrice}
        />
        <Button
          type='submit'
          className='form-btn__submit mt-0'
          onClick={handleSubmit}
          disabled={Object.keys(errors).length > 0 || !!enterError}
          fullWidth
        >
          رزرو
        </Button>
      </Form>
      {error && <p className='form__enter-error'>{error}</p>}
      <SuccessBookingModal
        open={isOpen}
        onClose={handleCloseModal}
        isLoading={bookingCreateStatusLoading}
        bookingData={data}
      />
    </>
  );
};

export default BookingForm;
