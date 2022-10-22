import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../store';
import { createLike, getLikesByReviewId, removeLike } from '../../../../store/likes';
import { getCurrentUserId } from '../../../../store/users';
import ButtonLike from '../../../common/ButtonLike';

type ReviewLikesProps = {
  reviewId: string;
};

const ReviewLikes: React.FC<ReviewLikesProps> = ({ reviewId }) => {
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId());
  const likes = useSelector(getLikesByReviewId(reviewId));

  const isLiked = likes.some((like: any) => like.userId === currentUserId);

  useEffect(() => {
    if (currentUserId) {
      setStatus(isLiked);
    }
  }, [JSON.stringify(likes), currentUserId]);

  const toggleLike = () => {
    const likeData = { userId: currentUserId || '', reviewId };

    if (isLiked) {
      removeLike(likeData)(dispatch, store.getState);
    } else {
      createLike(likeData)(dispatch);
    }
  };

  return <ButtonLike displayCount={likes?.length} status={status} onToggle={toggleLike} />;
};

export default ReviewLikes;
