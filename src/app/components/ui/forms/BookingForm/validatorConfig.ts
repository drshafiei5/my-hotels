import { ValidatorConfigType } from '../../../../utils/validator';
import { BookingType } from './../../../../types/types';

type ConfigType = {
  [Property in keyof BookingType]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  arrivalDate: {
    isValidDate: {
      message: 'تاریخ ورود نامعتبر',
    },
  },
  departureDate: {
    isValidDate: {
      message: 'تاریخ خروج نامعتبر',
    },
  },
};

export default validatorConfig;
