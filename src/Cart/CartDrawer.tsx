import { Drawer, Row, List, Image, Button, Typography, Col } from "antd";
import React from "react";
import { CartItem, ICartDrawerProps } from "../types";

const { Text, Paragraph } = Typography;

function CartDrawer({
  isOpen,
  items,
  onClose,
  onRemoveFromCart,
  onCheckout,
}: ICartDrawerProps) {
  const calculateSubtotal = () => {
    return items.reduce(
      (a: number, i: CartItem) => a + i.product.price * i.quantity,
      0
    );
  };

  const renderItem = (i: CartItem) => (
    <List.Item className="cart-drawer__product">
      <List.Item.Meta
        avatar={
          <Image
            className="cart-drawer__product-image"
            src={i.product.image}
            preview={false}
          />
        }
        title={i.product.title}
        description={
          <Paragraph>
            Quantity: {i.quantity}
            <br />
            Price: ${i.product.price.toFixed(2)}
          </Paragraph>
        }
      />
      <Col className="cart-drawer__actions">
        <Text
          strong
          className="text--highlight"
          style={{ fontSize: "120%", marginRight: "10px" }}
        >
          ${(i.product.price * i.quantity).toFixed(2)}
        </Text>
        <Button
          className="cart-drawer__button"
          type="primary"
          shape="round"
          size="large"
          onClick={() => onRemoveFromCart(i.product)}
        >
          Remove from Cart
        </Button>
      </Col>
    </List.Item>
  );

  return (
    <Drawer
      className="cart-drawer"
      title="Your cart"
      placement="right"
      closable={true}
      onClose={onClose}
      visible={isOpen}
      footer={
        items.length > 0 && (
          <>
            <Row align="middle" justify="space-between">
              <div className="cart-drawer__subtotal">
                Subtotal:{" "}
                <Text strong className="text--highlight">
                  ${calculateSubtotal()}
                </Text>
              </div>
              <Button type="primary" size="large" onClick={onCheckout}>
                Continue to Checkout
              </Button>
            </Row>
          </>
        )
      }
    >
      {(items.length > 0 && (
        <List dataSource={items} renderItem={renderItem} />
      )) || <p>Your cart is empty.</p>}
    </Drawer>
  );
}

export default CartDrawer;
