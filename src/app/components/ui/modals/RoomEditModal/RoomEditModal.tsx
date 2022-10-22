import { DialogContent } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { getRoomById } from '../../../../store/rooms';
import Modal from '../../../common/Modal';
import { RoomEditForm } from '../../forms';

type RoomModalProps = {
  open: boolean;
  onClose: () => void;
  roomId: string;
};

const RoomEditModal: React.FC<RoomModalProps> = ({ open, onClose, roomId }) => {
  const currentRoom = useSelector(getRoomById(roomId));

  return (
    <Modal title='ویرایش' open={open} onClose={onClose}>
      <DialogContent>
        <h3>ویرایش اتاق شماره ی {currentRoom?.roomNumber}</h3>
        <RoomEditForm roomData={currentRoom} onCloseModal={onClose} />
      </DialogContent>
    </Modal>
  );
};

export default React.memo(RoomEditModal);
