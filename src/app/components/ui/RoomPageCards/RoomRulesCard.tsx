import React from 'react';

const RoomRulesCard = () => {
  return (
    <div className='room-info__card'>
      <h3 className='room-info__card-title'>قوانین</h3>
      <ul className='bullet-list'>
        <li className='bullet-list__item'> حیوانات خانگی مجاز نیست</li>
        <li className='bullet-list__item'>بدون مهمانی یا رویداد</li>
        <li className='bullet-list__item'>ساعت ورود بعد از ساعت 13:00 و خروج قبل از ساعت 12:00 است</li>
      </ul>
    </div>
  );
};

export default RoomRulesCard;
