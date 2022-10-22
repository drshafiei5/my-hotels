import { TextField } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useForm } from '../../../../hooks';
import { getCurrentUserData, updateUserData } from '../../../../store/users';
import { UserType } from '../../../../types/types';
import Button from '../../../common/Button';
import { DatePickerField, InputField, RadioGroup } from '../../../common/Fields';
import validatorConfig from './validatorConfig';

const genderItems = [
  { id: 'male', title: 'مرد' },
  { id: 'female', title: 'زن' },
];

const ProfileEditForm = () => {
  const dispatch = useDispatch();
  const currentUserData = useSelector(getCurrentUserData());

  const initialData: UserType = {
    firstName: currentUserData?.firstName || '',
    secondName: currentUserData?.secondName || '',
    gender: currentUserData?.gender || 'male',
    birthYear: currentUserData?.birthYear || Date.now(),
    role: currentUserData?.role || 'user',
  };

  const { data, errors, handleInputChange, validate } =
    useForm(initialData, true, validatorConfig);


  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate(data)) {
      updateUserData(data)(dispatch);
    }
  };

  return (
    <>
      <Form data={data} errors={errors} handleChange={handleInputChange}>
        <InputField autoFocus name='firstName' label='نام' />
        <InputField name='secondName' label='نام خانوادگی' />
        <RadioGroup name='gender' items={genderItems} />

        <DatePickerField
          label='تاریخ تولد'
          name='birthYear'
          minDate={new Date("1950-01-01")}
          onChange={handleInputChange}
          value={data.birthYear}
          error={errors?.birthYear}
        />

        <Button
          type='submit'
          onClick={handleSubmit}
          fullWidth
          disabled={Object.keys(errors).length !== 0}
        >
          ویرایش پروفایل
        </Button>
      </Form>
    </>
  );
};

export default ProfileEditForm;
