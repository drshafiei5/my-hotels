import React from 'react';
import { SelectField } from '../../../common/Fields';

const roomsSortArray = [
  { name: 'نزولی', value: { path: 'roomNumber', order: 'desc' } },
  { name: 'صعودی', value: { path: 'roomNumber', order: 'asc' } },
  { name: 'تعداد نظر', value: { path: 'countReviews', order: 'desc' } },
  { name: 'مجموع امتیازات', value: { path: 'rate', order: 'desc' } },
  { name: 'ارزان ترین', value: { path: 'price', order: 'asc' } },
  { name: 'گران ترین', value: { path: 'price', order: 'desc' } },
];

type RoomsSortProps = {
  sortBy: { path: string; order: 'asc' | 'desc' };
  onSort: (event: any) => void;
};

const RoomsSort: React.FC<RoomsSortProps> = ({ sortBy, onSort }) => {
  return (
    <SelectField
      name='roomSort'
      style={{ minWidth: '200px' }}
      label='مرتب سازی'
      value={JSON.stringify(sortBy)}
      onChange={onSort}
      options={roomsSortArray}
    />
  );
};

export default RoomsSort;
