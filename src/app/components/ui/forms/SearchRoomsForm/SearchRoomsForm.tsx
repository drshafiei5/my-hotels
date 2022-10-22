import React from 'react';
import qs from 'query-string';
import { useNavigate } from 'react-router-dom';

import Button from '../../../common/Button/Button';
import { DateOfStayField } from '../../../common/Fields';
import { Form, useForm } from '../../../../hooks';
import GuestsCounter from '../../GuestsCounter';
import validatorConfig from './validatorConfig';
import { setSessionStorageData } from '../../../../services/sessionStorage.service';

const oneDayMs = 86400000;

const initialState = {
  arrivalDate: Date.now(),
  departureDate: Date.now() + oneDayMs,
  adults: 1,
  children: 0,
  babies: 0,
};

const SearchRoomsForm = () => {
  const navigate = useNavigate();
  const { data, errors, handleInputChange, validate, handleResetForm } =
    useForm(initialState, true, validatorConfig);


  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (validate(data)) {
      const queryParams = qs.stringify(data);
      setSessionStorageData(queryParams);
      navigate(`/rooms?${queryParams}`);
    }
  };

  return (
    <Form data={data} errors={errors} handleChange={handleInputChange} >
      <DateOfStayField data={data} onChange={handleInputChange} errors={errors} />
      <GuestsCounter data={data} onChange={handleInputChange} />
      <Button
        variant='outlined'
        type='button'
        size='small'
        onClick={handleResetForm}
        className='form-btn__reset'
        fullWidth
      >
        پاک کردن فرم
      </Button>
      <Button
        type='submit'
        className='form-btn__submit'
        onClick={handleSubmit}
        disabled={Object.keys(errors).length > 0}
        fullWidth
      >
        جستجوی هتل
      </Button>
    </Form>
  );
};

export default SearchRoomsForm;
