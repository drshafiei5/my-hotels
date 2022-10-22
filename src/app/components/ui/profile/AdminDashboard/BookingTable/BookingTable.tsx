import React from 'react';
import { BookingType } from '../../../../../types/types';
import { Table, TableBody, TableHeader } from '../../../../common/Table';
import BookingTableRow from './BookingTableRow';

type BookingTableProps = {
  bookings: BookingType[];
  roomNumber: string | number;
};

const BookingTable: React.FC<BookingTableProps> = ({ bookings, roomNumber }) => {
  const headCells = [
    { id: 'bookingId', label: 'ID' },
    { id: 'arrivalDate', label: 'تاریخ ورود' },
    { id: 'departureDate', label: 'تاریخ خروج' },
    { id: 'guests', label: 'مهمان ها' },
    { id: 'totalPrice', label: 'قیمت کل', numeric: true },
  ];
  return (
    <>
      <h3 style={{ margin: 10, textAlign: 'right' }}>
        {`لیست رزرو اتاق شماره ی ${roomNumber}`}
      </h3>
      <Table size='small' aria-label='purchases'>
        <TableHeader headCells={headCells} />
        <TableBody>
          {
            bookings.map(bookingRow => (
              <BookingTableRow
                key={bookingRow._id}
                row={bookingRow}
              />
            ))
          }
        </TableBody>
      </Table>
    </>
  );
};

export default BookingTable;
