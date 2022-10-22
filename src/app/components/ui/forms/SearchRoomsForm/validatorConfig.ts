import { BookingType } from '../../../../types/types';
import { ValidatorConfigType } from '../../../../utils/validator';

type ConfigType = {
  [Property in keyof BookingType]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  arrivalDate: {
    isValidDate: {
      message: 'تاریخ درست نیست',
    },
  },
  departureDate: {
    isValidDate: {
      message: 'تاریخ درست نیست',
    },
  },
  adults: {
    min: {
      message: 'Число взрослых гостей минимум 1 взрослый',
      value: 2,
    },
  },
};

export default validatorConfig;
