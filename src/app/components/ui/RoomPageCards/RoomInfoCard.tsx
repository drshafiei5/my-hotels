import LocationCityIcon from '@mui/icons-material/LocationCity';
import MoodIcon from '@mui/icons-material/Mood';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Divider from '../../common/Divider/Divider';

const RoomInfoCard = () => {
  return (
    <div className='room-info__card'>
      <h3 className='room-info__card-title'>اطلاعات اتاق</h3>
      <ul className='features-list'>
        <li className='features-list__item'>
          <div className='feature'>
            <MoodIcon className='feature__icon' />
            <div className='feature-content'>
              <div className='feature__title'>آسایش</div>
              <div className='feature__subtitle'>دیوارهای جاذب صدا</div>
            </div>
          </div>
          <Divider className='feature-separator' />
        </li>
        <li className='features-list__item'>
          <div className='feature'>
            <LocationCityIcon className='feature__icon' />
            <div className='feature-content'>
              <div className='feature__title'>راحتی</div>
              <div className='feature__subtitle'>پنجره در هر اتاق خواب</div>
            </div>
          </div>
          <Divider className='feature-separator' />
        </li>
        <li className='features-list__item'>
          <div className='feature'>
            <WhatshotIcon className='feature__icon' />
            <div className='feature-content'>
              <div className='feature__title'>آرامش</div>
              <div className='feature__subtitle'>اتاق مجهز به شومینه است</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default RoomInfoCard;
