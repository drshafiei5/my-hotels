import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getRoomById } from '../../../../store/rooms';
import Tooltip from '../../../common/Tooltip/Tooltip';

type Props = {
  roomId: string;
  countDays: number;
  setTotalPrice: (value: number) => void;
  totalPrice: number;
};

const BookingFormPriceInfo: React.FC<Props> = ({ roomId, countDays, setTotalPrice, totalPrice }) => {
  const { price } = useSelector(getRoomById(roomId)) || { price: 0 };
  const DISCOUNT_PERCENT = 10;
  const PRICE_SERVICE = 300;
  const PRICE_RENT = price * countDays;
  const PRICE_RENT_WITH_DISCOUNT = (price * countDays * DISCOUNT_PERCENT) / 100;

  const getTotalPrice = () => {
    return PRICE_RENT - PRICE_RENT_WITH_DISCOUNT + PRICE_SERVICE;
  };

  useEffect(() => {
    const totalPrice = getTotalPrice();
    setTotalPrice(totalPrice);
  }, [countDays]);

  return (
    <div className='booking-form__price'>
      <div className='booking-form__price-item'>
        <div className='price-item__result'>
          <span>{`${price} تومان * ${countDays} شب`}</span>
          <span>{PRICE_RENT} تومان</span>
        </div>
      </div>
      <div className='booking-form__price-item'>
        <div className='price-item__with-tooltip'>
          <span>تخفیف {DISCOUNT_PERCENT} درصد</span>
          <Tooltip title='تخفیف رزرو شما'>
            <InfoOutlinedIcon className='booking-form__tooltip-icon' />
          </Tooltip>
        </div>

        <span>{PRICE_RENT_WITH_DISCOUNT}- تومان</span>
      </div>
      <div className='booking-form__price-item'>
        <div className='price-item__with-tooltip'>
          <span>هزینه خدمات</span>
          <Tooltip title='هزینه خدمات'>
            <InfoOutlinedIcon className='booking-form__tooltip-icon' />
          </Tooltip>
        </div>
        <span>{PRICE_SERVICE} تومان</span>
      </div>
      <div className='booking-form__price-item'>
        <div className='price-item__totalPrice'>
          <span className='totalPrice__text'>مجموع</span>
          <span className='totalPrice__dots'></span>
          <span className='totalPrice__cell'>{totalPrice} تومان</span>
        </div>
      </div>
    </div>
  );
};

export default BookingFormPriceInfo;
