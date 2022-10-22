import { TablePagination } from '@mui/material';
import { useSelector } from 'react-redux';
import { usePagination, useSort } from '../../../../../hooks';
import { getRooms, getRoomsLoadingStatus } from '../../../../../store/rooms';
import { RoomType } from '../../../../../types/types';
import { Table, TableBody, TableHeader } from '../../../../common/Table';
import RoomsListTableRow from './RoomsListTableRow';

export type HeadCell = {
  id: keyof RoomType;
  numeric?: boolean;
  disablePadding?: boolean;
  label: string;
};

const headCells: HeadCell[] = [
  {
    id: 'roomNumber',
    numeric: false,
    disablePadding: false,
    label: 'شماره اتاق ها',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'نوع',
  },
  {
    id: 'rate',
    numeric: true,
    disablePadding: false,
    label: 'امتیاز',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'قیمت',
  },
  {
    id: 'bookings',
    numeric: true,
    disablePadding: false,
    label: 'رزروها',
  },
];

const RoomsListTable = () => {
  const rowsPerPageOptions = [5, 10, 25];
  const rooms = useSelector(getRooms());
  const roomsIsLoading = useSelector(getRoomsLoadingStatus());

  const { sortedItems, sortBy, handleRequestSort } =
    useSort(rooms || [], { path: 'bookings', order: 'desc' });

  const {
    itemsListCrop: roomsCroppedList,
    currentPage,
    pageSize,
    handleChangePage,
    handleChangePageSize,
  } = usePagination(sortedItems, rowsPerPageOptions[0]);

  return (
    <>
      {!roomsIsLoading && (
        <>
          <Table title='لیست اتاق ها'>
            <TableHeader
              headCells={headCells}
              sortBy={sortBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody
              itemsCount={sortedItems.length}
              page={currentPage - 1}
              rowsPerPage={pageSize}
            >
              {
                roomsCroppedList.map((row: any) => (
                  <RoomsListTableRow key={row?._id} row={row} />
                ))
              }
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={rooms.length}
            rowsPerPage={pageSize}
            page={currentPage - 1}
            onPageChange={(event, value) => handleChangePage(event, value + 1)}
            onRowsPerPageChange={handleChangePageSize}
            labelRowsPerPage='تعداد نمایش در هر صفحه'
            sx={{ direction: 'ltr' }}
          />
        </>
      )}
    </>
  );
};

export default RoomsListTable;
