import React from 'react';
import { useDispatch } from 'react-redux';

import { updateRoomData } from '../../../../store/rooms';
import { RoomType } from '../../../../types/types';
import { Form, useForm } from '../../../../hooks';
import validatorConfig from './validatorConfig';
import Button from '../../../common/Button';
import {
  Checkbox, CheckBoxList, InputField,
  RadioGroup, SelectField
} from '../../../common/Fields';

type RoomEditFormProps = {
  roomData: RoomType | undefined;
  onCloseModal: () => void;
};

const roomType = [
  { id: 'Стандарт', title: 'استاندارد' },
  { id: 'Люкс', title: 'لوکس' },
];
const roomComfortsOptions = [
  { name: 'Wi-Fi', value: 'hasWifi' },
  { name: 'دارای محل کار', value: 'hasWorkSpace' },
  { name: 'دارای وسیله سرمایشی', value: 'hasConditioner' },
];

const RoomEditForm: React.FC<RoomEditFormProps> = ({ roomData, onCloseModal }) => {
  const initialData: RoomType = {
    _id: roomData?._id || 'not found',
    roomNumber: roomData?.roomNumber || '',
    type: roomData?.type || 'Стандарт',
    price: roomData?.price || 0,
    comforts: roomData?.comforts || [],
    canPets: roomData?.canPets || false,
    canSmoke: roomData?.canSmoke || false,
    canInvite: roomData?.canInvite || false,
    hasWideCorridor: roomData?.hasWideCorridor || false,
    hasDisabledAssistant: roomData?.hasDisabledAssistant || false,
  };

  const { data, errors, handleInputChange, validate } =
    useForm(initialData, true, validatorConfig);

  const dispatch = useDispatch();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (validate(data)) {
      updateRoomData(data)(dispatch);
      onCloseModal();
    }
  };


  return (
    <>
      <Form data={data} errors={errors} handleChange={handleInputChange}>
        <InputField label='شماره اتاق' name='roomNumber' autoFocus />
        <RadioGroup label='نوع اتاق' name='type' items={roomType} value={roomData?.type} />
        <InputField label='اجاره در روز (تومان)' name='price' />
        <SelectField label='امکانات' name='comforts' options={roomComfortsOptions} multiple />
        <CheckBoxList>
          <Checkbox label='حیوانات خانگی مجاز است' name='canPets' />
          <Checkbox label='می توانید سیگار بکشید' name='canSmoke' />
          <Checkbox label='می توانید مهمان دعوت کنید (حداکثر 10 نفر)' name='canInvite' />
        </CheckBoxList>
        <CheckBoxList>
          <Checkbox
            label='راهروی وسیع'
            name='hasWideCorridor'
            labelDetails='عرض راهروها در اتاق حداقل 91 سانتی متر است'
          />
          <Checkbox
            label='مددکار معلولان'
            name='hasDisabledAssistant'
            labelDetails='یک همراه شما را در طبقه 1 ملاقات می کند و شما را به اتاقتان می برد'
          />
        </CheckBoxList>

        <Button
          type='submit'
          onClick={handleSubmit}
          fullWidth
          disabled={Object.keys(errors).length !== 0}
        >
          ویرایش
        </Button>
      </Form>
    </>
  );
};

export default RoomEditForm;
