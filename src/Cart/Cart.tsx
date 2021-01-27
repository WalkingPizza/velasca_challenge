import { ShoppingCartOutlined } from "@ant-design/icons";
import { Row } from "antd";
import React from "react";
import { CartItem, ICartProps } from "../types";

function Cart({ items, onClick }: ICartProps) {
  const countCartItems = () => {
    return items.reduce((a: number, b: CartItem) => a + b.quantity, 0) || 0;
  };

  return (
    <Row align="middle" justify="end" className="cart" onClick={onClick}>
      <ShoppingCartOutlined className="cart__icon" style={{ fontSize: 30 }} />
      <span className="cart__count">{countCartItems()}</span>
    </Row>
  );
}

export default Cart;
