import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Input from './Input';
import { useCart } from '../contexts/CartContext';
import '../styles/index.css';

const CartItem = ({ item }) => {
    const { updateItem, removeItem } = useCart();

    return (
        <div className="cui-cart-item">
            <div className="cui-cart-left">
                {item.image && <img src={item.image} alt={item.name} className="cui-cart-img" />}
                <div>
                    <div className="cui-cart-name">{item.name}</div>
                    <div className="cui-cart-price">{(item.price || 0).toFixed(2)}</div>
                </div>
            </div>
            <div className="cui-cart-right">
                <Input type="number" value={item.quantity} min={1} onChange={v => updateItem(item.id, Number(v) || 1)} />
                <Button variant="danger" onClick={() => removeItem(item.id)}>Xóa</Button>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.object.isRequired
};

export default CartItem;
