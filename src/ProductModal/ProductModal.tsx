import { Col, Image, Modal, Row, Typography } from "antd";
import React from "react";
import { IProductModalProps } from "../types";

const { Title, Paragraph } = Typography;

function ProductModal({ product, onClose, onAddToCart }: IProductModalProps) {
  return (
    <Modal
      width={1000}
      centered
      visible={true}
      footer={null}
      onCancel={onClose}
    >
      <Row justify="space-between">
        <Col lg={{ span: 6, offset: 0 }} xs={{ span: 12, offset: 6 }}>
          <Image src={product.image} className="product-modal__picture" />
        </Col>
        <Col lg={16} xs={24} className="product-modal__content">
          <Title level={2} style={{ marginBottom: 0 }}>
            {product.title}
          </Title>
          <Title level={5} className="product__category">
            {product.category}
          </Title>
          <Paragraph>{product.description}</Paragraph>
        </Col>
      </Row>
    </Modal>
  );
}

export default ProductModal;
