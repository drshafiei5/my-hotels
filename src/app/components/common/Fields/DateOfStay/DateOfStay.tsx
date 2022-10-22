import React from 'react';
import DatePickerField from '../DatePickerField';

const oneDayMs = 86_400_000;

type DateOfStayProps = {
  data: any;
  errors?: { [x: string]: string };
  onChange: (target: any) => void;
};

const DateOfStay: React.FC<DateOfStayProps> = ({ onChange, data, errors }) => {
  const { arrivalDate, departureDate } = data;

  return (
    <div className='dateOfStay-wrapper'>
      <div className='dateOfStay'>
        <DatePickerField
          label='تاریخ ورود'
          name='arrivalDate'
          minDate={+arrivalDate}
          onChange={onChange}
          value={+arrivalDate}
          error={errors?.arrivalDate}
        />
      </div>
      <div className='dateOfStay'>
        <DatePickerField
          label='تاریخ خروج'
          name='departureDate'
          minDate={+arrivalDate + oneDayMs}
          onChange={onChange}
          value={+departureDate}
          error={errors?.departureDate}
        />
      </div>
    </div>
  );
};

export default DateOfStay;
