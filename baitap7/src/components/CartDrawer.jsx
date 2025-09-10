import React from 'react';
import Modal from './Modal';
import CartList from './CartList';
import { useCart } from '../contexts/CartContext';
import '../styles/index.css';
const CartDrawer = ({ open, onClose }) => {
  const { count } = useCart();
  return (
    <Modal open={open} onClose={onClose} title={`Giỏ hàng (${count})`}>
      <CartList />
    </Modal>
  );
};

export default CartDrawer;
