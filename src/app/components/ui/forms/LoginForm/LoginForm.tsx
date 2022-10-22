import React, { useMemo } from 'react';
import { Form, useForm } from '../../../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthErrors, signIn } from '../../../../store/users';
import { SignInDataType } from '../../../../types/types';
import Button from '../../../common/Button/Button';
import { InputField } from '../../../common/Fields';
import withPassword from '../../../common/Fields/HOC/withPassword';
import validatorConfig from './validatorConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { validator } from '../../../../utils/validator';

const initialData: SignInDataType = {
  email: '',
  password: '',
};


// interface LocationState {
//   from: {
//     pathname: string;
//   };
// }

const LoginForm = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  // const from = (location.state as LocationState)?.from;

  const { data, errors, handleInputChange, validate, handleResetForm } = useForm(initialData, false, validatorConfig);

  const loginError = useSelector(getAuthErrors());
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validate(data)) {
      // const redirect = from ? from.pathname : '/';
      signIn({ payload: data })(dispatch);
      handleResetForm(e);
    }
  };

  const InputFieldWithPassword = useMemo(() => withPassword(InputField), []);
  const isValidData = useMemo(() => {
    return data?.email?.length > 0 &&
      data?.password?.length > 0 &&
      Object.keys(validator(data, validatorConfig)).length === 0
  },
    [data]
  );

  return (
    <>
      <Form data={data} errors={errors} handleChange={handleInputChange}>
        <InputField name='email' label='ایمیل' autoFocus type='email' />
        <InputFieldWithPassword name='password' label='رمز عبور' type='password' />
        <Button onClick={handleSubmit} fullWidth type='submit' disabled={!isValidData}>
          ورود
        </Button>
      </Form>
      {loginError && <p className='form__enter-error'>{loginError}</p>}
    </>
  );
};

export default LoginForm;
