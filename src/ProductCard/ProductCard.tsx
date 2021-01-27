import { Button, Card, Image, Input, InputNumber, Row, Typography } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { IProductCardProps } from "../types";

const { Meta } = Card;
const { Paragraph } = Typography;

function ProductCard({
  product,
  onMoreInformationClick,
  onAddToCart,
}: IProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const changeQuantity = (qty: number) => {
    if (!(qty < 0 && quantity === 1)) {
      setQuantity(quantity + qty);
    }
  };

  return (
    <Card
      className="product"
      cover={
        <Image preview={false} className="product__image" src={product.image} />
      }
    >
      <Meta
        title={product.title}
        description={
          <Paragraph ellipsis={{ rows: 2, expandable: false, symbol: "..." }}>
            {product.description}
          </Paragraph>
        }
      />
      <Row
        className="product__information"
        justify="space-between"
        align="middle"
      >
        <div className="product__price rounded-box">
          ${product.price.toFixed(2)}
        </div>
        <Button
          className="product__more-info rounded-box--secondary"
          onClick={() => onMoreInformationClick(product)}
        >
          More info
        </Button>
      </Row>
      <Row align="middle" style={{ marginTop: "5px", flexWrap: "nowrap" }}>
        <Input.Group className="product__qty-selector">
          <Button
            className="product__qty-button--minus"
            onClick={() => changeQuantity(-1)}
          >
            <MinusOutlined />
          </Button>
          <InputNumber
            readOnly
            className="product__qty"
            value={quantity}
            min={1}
          />
          <Button
            className="product__qty-button--plus"
            onClick={() => changeQuantity(1)}
          >
            <PlusOutlined />
          </Button>
        </Input.Group>
        <Button
          className="product__cart-button"
          type="primary"
          shape="round"
          size="large"
          onClick={() => onAddToCart(product, quantity)}
        >
          Add to Cart
        </Button>
      </Row>
    </Card>
  );
}

export default ProductCard;
