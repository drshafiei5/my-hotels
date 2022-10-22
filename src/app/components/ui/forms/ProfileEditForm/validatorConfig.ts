import { UserType } from '../../../../types/types';
import { ValidatorConfigType } from '../../../../utils/validator';

type ConfigType = {
  [Property in keyof UserType]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  firstName: {
    isRequired: {
      message: 'فیلد نام الزامی است',
    },
  },
  secondName: {
    isRequired: {
      message: 'فیلد نام خانوادگی الزامی است',
    },
  },
  email: {
    isRequired: {
      message: 'ایمیل مورد نیاز است',
    },
    isEmail: {
      message: 'فیلد ایمیل به اشتباه وارد شده است',
    },
  },
  password: {
    isRequired: {
      message: 'فیلد رمز عبور الزامی است',
    },
    isCapitalSymbol: {
      message: 'رمز عبور باید حداقل دارای 1 حرف بزرگ باشد',
    },
    isContainDigit: {
      message: 'رمز عبور باید حداقل دارای 1 عدد باشد',
    },

    min: {
      value: 8,
      message: 'رمز عبور باید حداقل 8 کاراکتر داشته باشد',
    },
  },
};

export default validatorConfig;
