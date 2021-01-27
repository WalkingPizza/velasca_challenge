import React, { useEffect, useState } from "react";
import "./App.less";
import { CartItem, Product, SortingCriteria } from "./types";
import { getAllProducts, processCart } from "./handlers";
import { LoadingOutlined } from "@ant-design/icons";
import { Col, Row, Select, Spin, Typography } from "antd";
import ProductCard from "./ProductCard/ProductCard";
import ProductModal from "./ProductModal/ProductModal";
import Searchbar from "./SearchBar/SearchBar";
import Cart from "./Cart/Cart";
import CartDrawer from "./Cart/CartDrawer";

const { Option } = Select;
const { Text } = Typography;

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [modalProduct, setModalProduct] = useState<Product>();
  const [products, setProducts] = useState<Product[]>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [sortingFilter, setSortingFilter] = useState<SortingCriteria>(
    SortingCriteria.ASC
  );

  const spinnerIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const renderProductCard = (p: Product) => {
    return (
      <ProductCard
        key={p.id}
        product={p}
        onMoreInformationClick={updateModalProduct}
        onAddToCart={handleAddToCart}
      />
    );
  };

  const toggleDrawer = () => {
    setCartDrawerOpen(!cartDrawerOpen);
  };

  const handleSearch = (v: string) => {
    setSearchValue(v);
  };

  const updateModalProduct = (p: Product) => {
    setModalProduct(p);
  };

  const handleCloseModal = () => {
    setModalProduct(undefined);
  };

  const handleAddToCart = (p: Product, q = 1) => {
    let newCart;

    if (!cart.some((i) => i.product.id === p.id)) {
      newCart = [...cart, new CartItem(p, q)];
    } else {
      newCart = [...cart];
      const item = newCart.findIndex((i) => i.product.id === p.id);
      newCart[item].changeQuantity(q);
    }

    setCart(newCart);
    setCartDrawerOpen(true);
  };

  const handleRemoveFromCart = (p: Product) => {
    setCart(cart.filter((i) => i.product.id !== p.id));
  };

  const handleCheckout = () => {
    processCart(cart).then((r) => console.log("Checkout Completed"));
  };

  const handleChangeCategoryFilter = (v: string[]) => {
    setCategoryFilter(v);
  };

  const handleChangeSortingFilter = (v: SortingCriteria) => {
    setSortingFilter(v);
  };

  useEffect(() => {
    if (!products) {
      setIsLoading(true);
      getAllProducts().then((p) => {
        setProducts(p);
        setIsLoading(false);
      });
    }
  }, [products]);

  const filterProducts = (sort = null) => {
    let filteredProducts = products!.filter((p) =>
      p.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (categoryFilter.length > 0) {
      filteredProducts = filteredProducts.filter((p) =>
        categoryFilter.includes(p.category)
      );
    }
    if (sortingFilter) {
      filteredProducts = filteredProducts.sort((a, b) =>
        sortingFilter === SortingCriteria.DESC
          ? b.price - a.price
          : a.price - b.price
      );
    }
    return filteredProducts.length > 0 ? (
      filteredProducts.map(renderProductCard)
    ) : (
      <p>
        No products matching {searchValue}
        {categoryFilter.length > 0 && ` in ${categoryFilter.join(", ")}`}.
      </p>
    );
  };

  const getCategories = () => {
    const categories = products!
      .map((p) => p.category)
      .filter((v, i, a) => a.indexOf(v) === i);
    return categories.map((c, i) => (
      <Option key={i} value={c}>
        {c}
      </Option>
    ));
  };

  return (
    <div
      className={
        isLoading
          ? "ecomm-container ecomm-container--is-loading"
          : "ecomm-container"
      }
    >
      {isLoading && <Spin indicator={spinnerIcon} />}

      {products && (
        <>
          <Row className="header" justify="space-between">
            <Col lg={20} xs={18}>
              <Searchbar onSearch={handleSearch} />
            </Col>
            <Col span={4}>
              <Cart
                items={cart}
                onRemoveFromCart={handleRemoveFromCart}
                onClick={toggleDrawer}
              />
            </Col>
          </Row>
          <Row className="filters" justify="space-between">
            <Col lg={10} xs={24}>
              <Select
                maxTagCount="responsive"
                mode="tags"
                placeholder="Filter by Category"
                onChange={handleChangeCategoryFilter}
                showArrow
                allowClear
                className="filters__category"
              >
                {getCategories()}
              </Select>
            </Col>
            <Col lg={{ span: 9, offset: 1 }} xs={24}>
              <Row
                align="middle"
                justify="end"
                className="filters__row--second"
              >
                <Text style={{ marginRight: "10px" }}>Sort by Price</Text>
                <Select
                  onChange={handleChangeSortingFilter}
                  showArrow
                  allowClear
                  className="filters__sorting"
                  defaultValue={sortingFilter}
                >
                  <Option value={SortingCriteria.ASC} key={SortingCriteria.ASC}>
                    Ascending
                  </Option>
                  <Option
                    value={SortingCriteria.DESC}
                    key={SortingCriteria.DESC}
                  >
                    Descending
                  </Option>
                </Select>
              </Row>
            </Col>
          </Row>
          <Row className="product-container" align="stretch">
            {products && filterProducts()}
          </Row>
          <CartDrawer
            isOpen={cartDrawerOpen}
            onClose={toggleDrawer}
            onRemoveFromCart={handleRemoveFromCart}
            items={cart}
            onCheckout={handleCheckout}
          />
        </>
      )}

      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}

export default App;
