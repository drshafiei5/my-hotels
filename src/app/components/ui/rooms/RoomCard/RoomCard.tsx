import React from 'react';
import { Link } from 'react-router-dom';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ComputerIcon from '@mui/icons-material/Computer';
import WifiIcon from '@mui/icons-material/Wifi';
import { useSelector } from 'react-redux';

import Badge from '../../../common/Badge';
import Divider from '../../../common/Divider';
import ImageSlider from '../../../common/ImageSlider';
import Rating from '../../../common/Rating';
import { RoomType } from '../../../../types/types';
import { getReviewsByRoomId } from '../../../../store/reviews';

const comfortIconsMap: { [x: string]: JSX.Element } = {
  hasWifi: <WifiIcon />,
  hasConditioner: <AcUnitIcon />,
  hasWorkSpace: <ComputerIcon />,
};

const RoomCard: React.FC<RoomType> = ({ _id, roomNumber, price, type, images, comforts }) => {
  const reviews = useSelector(getReviewsByRoomId(_id));
  const countReviews = reviews ? reviews.length : 0;
  const totalRating = countReviews > 0 ?
    reviews.reduce((acc: number, cur: any) => acc + cur.rating, 0) : 0;

  return (
    <div className='room-card'>
      {
        comforts && (
          <Badge className='badge'>
            {
              comforts.map(comfort => (
                <div key={comfort}>{comfortIconsMap[comfort]}</div>
              ))
            }
          </Badge>
        )
      }

      <ImageSlider className='room-card__gallery'>
        {
          images &&
          images.map(img => (
            <div className='room-card__gallery-item' key={img}>
              <img className='room-card__gallery-item--img' src={img} alt='roomsPhoto' />
            </div>
          ))
        }
      </ImageSlider>

      <Link to={`/rooms/${_id}`} className='room-card__description'>
        <div className='room-card__description-row'>
          <h3 className='room-card__title'>
            کد <span className='room-card__title--big'>{roomNumber}</span>
            {
              type === 'Люкс' && <span className='room-card__type'>لوکس</span>
            }
          </h3>
          <div className='room-card__rentPerDay'>
            <span>{price} تومان</span> یک شب
          </div>
        </div>
        <Divider />
        <div className='room-card__description-row'>
          <div className='room-card__rating'>
            <Rating name='read-only' value={totalRating} totalCount={countReviews} precision={0.5} readOnly />
          </div>
          <div className='room-card__reviews'>
            <span className='room-card__reviews-count'>{`${countReviews} نظر`}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RoomCard;
