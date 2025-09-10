import React, { useState } from "react";
import {
  CartProvider,
  useCart,
  Button,
  Input,
  Modal,
  CartList,
  CartDrawer
} from "baitap7";

function DemoCart() {
  const { items, addItem, removeItem, updateItem, total, count, clear } =
    useCart();

  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [newProduct, setNewProduct] = useState("");

  const handleAdd = () => {
    if (!newProduct.trim()) return;
    addItem({ id: Date.now(), name: newProduct, price: 100 });
    setNewProduct("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Giỏ hàng demo ({count} sản phẩm)</h1>

      {/* Input + Button */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Input
          value={newProduct}
          placeholder="Tên sản phẩm..."
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <Button onClick={handleAdd}>Thêm</Button>
      </div>

      {/* Cart List */}
      <CartList
        items={items}
        onRemove={(id) => removeItem(id)}
        onUpdate={(id, quantity) => updateItem(id, quantity)}
      />

      <h3 style={{ marginTop: "20px" }}>Tổng cộng: {total} VND</h3>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <Button onClick={() => setShowModal(true)}>Mở Modal</Button>
        <Button onClick={() => setShowDrawer(true)}>Mở Cart Drawer</Button>
        <Button onClick={clear} style={{ background: "red" }}>
          Xóa hết
        </Button>
      </div>

      {/* Modal demo */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <h2>Modal Demo</h2>
        <p>Đây là modal được export từ lib</p>
        <Button onClick={() => setShowModal(false)}>Đóng</Button>
      </Modal>

      {/* Drawer demo */}
      <CartDrawer open={showDrawer} onClose={() => setShowDrawer(false)}>
        <h2>Cart Drawer</h2>
        <CartList
          items={items}
          onRemove={(id) => removeItem(id)}
          onUpdate={(id, quantity) => updateItem(id, quantity)}
        />
      </CartDrawer>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <DemoCart />
    </CartProvider>
  );
}
