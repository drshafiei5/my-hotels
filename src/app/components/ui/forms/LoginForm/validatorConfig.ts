import { SignInDataType } from '../../../../types/types';
import { ValidatorConfigType } from '../../../../utils/validator';

type ConfigType = {
  [Property in keyof SignInDataType]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  email: {
    isEmail: {
      message: 'ایمیل معتبر نیست',
    },
  },
  password: {
    isRequired: {
      message: 'رمز عبور الزامی است',
    },
  },
};

export default validatorConfig;