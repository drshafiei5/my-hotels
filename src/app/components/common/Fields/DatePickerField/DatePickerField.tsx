import React from 'react';
import { TextField } from '@mui/material';
import AdapterJalali from '@date-io/date-fns-jalali';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


type DatePickerFieldProps = {
  label: string;
  value: Date | number;
  minDate: Date | number;
  name: string;
  error?: string;
  onChange: (target: any) => void
};

const DatePickerField: React.FC<DatePickerFieldProps> =
  ({ label, name, value, minDate, onChange: changeDate, error, ...rest }) => {
    // generate event target for handleInputChange on useForm
    const convertToDefEventParam = (name: string, value: Date | number | null) => ({
      target: {
        name,
        value: new Date(Number(value)).getTime(),
      }
    });

    return (
      <LocalizationProvider dateAdapter={AdapterJalali}>
        <DesktopDatePicker
          label={label}
          value={value}
          minDate={minDate || Date.now()}
          onChange={date => {
            changeDate(convertToDefEventParam(name, date));
          }}
          renderInput={(params) =>
            <TextField
              {...params}
              error={!!error}
              helperText={error}
              sx={{
                direction: 'ltr',
                textAlign: 'left'
              }}
            />
          }
        />
      </LocalizationProvider>
    );
  };

export default React.memo(DatePickerField);
