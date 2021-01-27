export class Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.price = Number(data.price);
    this.category = data.category;
    this.description = data.description;
    this.image = data.image;
  }
}

export class CartItem {
  product: Product;
  quantity: number;

  constructor(p: Product, q = 1) {
    this.product = p;
    this.quantity = q;
  }

  changeQuantity = (q: number) => {
    this.quantity += q;
  };
}

export interface IProductCardProps {
  product: Product;
  onAddToCart: (p: Product, q: number) => void;
  onMoreInformationClick: (p: Product) => void;
}

export interface IProductModalProps {
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  product: Product;
}

export interface ISearchbarProps {
  onSearch: (v: string) => void;
}

export interface ICartProps {
  items: CartItem[];
  onRemoveFromCart: (p: Product) => void;
  onClick: () => void;
}

export interface ICartDrawerProps {
  isOpen: boolean;
  onRemoveFromCart: (p: Product) => void;
  onCheckout: () => void;
  onClose: () => void;
  items: CartItem[];
}

export enum SortingCriteria {
  ASC = 1,
  DESC = 2,
}
