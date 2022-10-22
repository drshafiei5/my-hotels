import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { removeReview, updateReview } from '../../../../store/reviews';
import { getRoomById, updateRoomData } from '../../../../store/rooms';
import { getCurrentUserData, getUserById } from '../../../../store/users';
import { ReviewType } from '../../../../types/types';
import Avatar from '../../../common/Avatar';
import Button from '../../../common/Button';
import { TextAreaField } from '../../../common/Fields';
import Loader from '../../../common/Loader';
import Rating from '../../../common/Rating';
import Tooltip from '../../../common/Tooltip';
import ReviewLikes from '../ReviewLikes';
import { format } from 'date-fns-jalali';

type ReviewProps = {
  review: ReviewType;
};

const Review: React.FC<ReviewProps> = ({ review }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState<string | null>(review.content);
  const [editMode, setEditMode] = useState(false);
  const currentRoomData = useSelector(getRoomById(review.roomId));
  const user = useSelector(getUserById(review.userId || ''));
  const currentUser = useSelector(getCurrentUserData());

  const displayReviewData = () => {
    if (review.created_at !== review.updated_at) {
      return `ویرایش شده: ${format(new Date(review?.updated_at || ''), 'yyyy/MM/dd HH:mm')}`;
    }
    return format(new Date(review?.created_at || ''), 'yyyy/MM/dd HH:mm');
  };

  const isAdmin = currentUser?.role === 'admin';
  const isAuthor = review.userId === currentUser?._id;
  const showDeleteBtn = isAdmin || isAuthor;

  const handleChangeReview = () => {
    setEditMode(false);

    const payload = {
      _id: review._id,
      rating: review.rating,
      roomId: review.roomId,
      content: String(content)
    };

    updateReview(payload)(dispatch);
  };

  const handleRemoveReview = () => {
    removeReview(review._id || '')(dispatch);

    const updateRoomPayload = {
      _id: currentRoomData?._id || 'not found',
      price: currentRoomData?.price || 0,
      roomNumber: currentRoomData?.roomNumber || 'not found',
      countReviews: Number(currentRoomData?.countReviews) - 1,
      rate: Number(currentRoomData?.rate) - review.rating,
    };

    updateRoomData(updateRoomPayload)(dispatch);
  };

  useEffect(() => {
    setContent(review.content);
  }, [review]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  if (user) {
    return (
      <li className='reviews-list__item'>
        <div className='review'>
          <div className='review__avatar'>
            <div className='avatar'>
              <Avatar alt='کاربر' src={user.avatarPhoto || ''} className='avatar__img' />
            </div>
            <ReviewLikes reviewId={review._id || ''} />
          </div>
          <div className='review__content'>
            <div className='review__user-name'>
              {`${user.firstName} ${user.secondName} `}
              {
                isAuthor && (
                  <div className='review__edit-btn'>
                    <Tooltip title='ویرایش'>
                      <IconButton onClick={() => setEditMode(true)}>
                        <EditIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                  </div>
                )
              }

              {
                showDeleteBtn && (
                  <div className='review__delete-btn'>
                    <Tooltip title='حذف نظر'>
                      <IconButton onClick={handleRemoveReview}>
                        <ClearIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                  </div>
                )
              }
              <div className='review__rating'>
                <Rating value={review.rating} readOnly />
              </div>
            </div>
            <p className='review__date'>{displayReviewData()}</p>
            {
              editMode ? (
                <>
                  <TextAreaField value={content} onChange={handleChange} rows={3} />
                  <Button
                    variant='outlined'
                    size='small'
                    style={{ marginTop: '5px' }}
                    onClick={handleChangeReview}
                  >
                    ویرایش کردن
                  </Button>
                </>
              ) : (
                <p className='review__message'>{content}</p>
              )
            }
          </div>
        </div>
      </li>
    );
  }
  return <Loader />;
};

export default Review;
