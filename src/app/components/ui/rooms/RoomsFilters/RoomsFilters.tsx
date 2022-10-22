import React, { useCallback } from 'react';
import { useFiltersQuery } from '../../../../hooks';
import Button from '../../../common/Button';
import { Checkbox, CheckBoxList, DateOfStayField, RangeSliderField } from '../../../common/Fields';
import GuestsCounter from '../../GuestsCounter/GuestsCounter';
import RoomsFilterList from './RoomsFiltersList/RoomsFiltersList';

const oneDayMs = 86000000;

const initialState = {
  arrivalDate: Date.now(),
  departureDate: Date.now() + oneDayMs,
  adults: 1,
  children: 0,
  babies: 0,
  price: [0, 15000],
  canSmoke: false,
  canPets: false,
  canInvite: false,
  hasWideCorridor: false,
  hasDisabledAssistant: false,
  hasWifi: false,
  hasConditioner: false,
  hasWorkSpace: false,
};

type RoomsFilterProps = {
  onReset: () => void;
};

const RoomsFilter: React.FC<RoomsFilterProps> = ({ onReset }) => {
  const { searchFilters, handleChangeFilter } = useFiltersQuery();

  const handleResetFilters = useCallback(
    (e: any) => {
      e.preventDefault();
      onReset();
    },
    [onReset]
  );

  const data = { ...initialState, ...searchFilters };

  return (
    <section className='filters__wrapper'>
      <h2 className='visually-hidden'>جستجوی اتاق در هتل</h2>
      <RoomsFilterList data={data} handleChange={handleChangeFilter}>
        <DateOfStayField data={data} onChange={handleChangeFilter} />
        <GuestsCounter data={data} onChange={handleChangeFilter} />
        <RangeSliderField
          label='حدود قیمت'
          description='هزینه هر شب اقامت در اتاق'
          name='price'
          onChange={handleChangeFilter}
          min={0}
          max={15000}
        />
        <CheckBoxList title='امکانات'>
          <Checkbox label='Wi-Fi' name='hasWifi' />
          <Checkbox label='وسایل سرمایشی' name='hasConditioner' />
          <Checkbox label='فضای کاری' name='hasWorkSpace' />
        </CheckBoxList>
        <CheckBoxList title='شرایط اسکان'>
          <Checkbox label='حیوان خانگی مجاز' name='canPets' />
          <Checkbox label='سیگار کشیدن مجاز' name='canSmoke' />
          <Checkbox label='امکان دعوت مهمان (حداکثر 10 نفر)' name='canInvite' />
        </CheckBoxList>
        <CheckBoxList title='دسترسی'>
          <Checkbox
            label='راهروی وسیع'
            name='hasWideCorridor'
            labelDetails='عرض راهروها در اتاق حداقل 91 سانتی متر است'
          />
          <Checkbox
            label='مددکار برای معلولین'
            name='hasDisabledAssistant'
            labelDetails='یک همراه شما را در طبقه 1 ملاقات می کند و شما را به اتاقتان می برد'
          />
        </CheckBoxList>
        <Button type='button' onClick={handleResetFilters} fullWidth>
          حذف فیلترها
        </Button>
      </RoomsFilterList>
    </section>
  );
};

export default React.memo(RoomsFilter);
