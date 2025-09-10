import React from 'react';
import { useCart } from '../contexts/CartContext';
import CartItem from './CartItem';
import Card from './Card';
import Button from './Button';
import '../styles/index.css';

const CartList = () => {
  const { items, total, clear } = useCart();
  if (!items.length) return <Card><p>Giỏ hàng trống</p></Card>;

  return (
    <Card>
      {items.map(it => <CartItem key={it.id} item={it} />)}
      <div className="cui-cart-footer">
        <strong>Tổng: {(total).toFixed(2)}</strong>
        <Button variant="ghost" onClick={clear}>Xóa tất cả</Button>
      </div>
    </Card>
  );
};

export default CartList;
