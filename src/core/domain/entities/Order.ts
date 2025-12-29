/**
 * Order Entity (Domain Model)
 * Represents an order in the domain
 */

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode?: string;
  country: string;
  additionalInfo?: string;
}

export interface OrderDTO {
  id: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
}

export class Order {
  constructor(
    public readonly id: string,
    public readonly buyerId: string,
    public readonly buyerName: string,
    public readonly sellerId: string,
    public readonly sellerName: string,
    public readonly items: OrderItem[],
    public readonly total: number,
    public readonly status: OrderStatus = 'pending',
    public readonly shippingAddress: ShippingAddress,
    public readonly createdAt: string = new Date().toISOString(),
    public readonly updatedAt: string = new Date().toISOString()
  ) {}

  // Business logic
  isPending(): boolean {
    return this.status === 'pending';
  }

  isProcessing(): boolean {
    return this.status === 'processing';
  }

  isShipped(): boolean {
    return this.status === 'shipped';
  }

  isDelivered(): boolean {
    return this.status === 'delivered';
  }

  isCancelled(): boolean {
    return this.status === 'cancelled';
  }

  canBeCancelled(): boolean {
    return this.isPending() || this.isProcessing();
  }

  canBeShipped(): boolean {
    return this.isProcessing();
  }

  // State transitions (immutable)
  markAsProcessing(): Order {
    if (!this.isPending()) {
      throw new Error('Only pending orders can be marked as processing');
    }
    return this.updateStatus('processing');
  }

  markAsShipped(): Order {
    if (!this.canBeShipped()) {
      throw new Error('Only processing orders can be marked as shipped');
    }
    return this.updateStatus('shipped');
  }

  markAsDelivered(): Order {
    if (!this.isShipped()) {
      throw new Error('Only shipped orders can be marked as delivered');
    }
    return this.updateStatus('delivered');
  }

  cancel(): Order {
    if (!this.canBeCancelled()) {
      throw new Error('This order cannot be cancelled');
    }
    return this.updateStatus('cancelled');
  }

  private updateStatus(newStatus: OrderStatus): Order {
    return new Order(
      this.id,
      this.buyerId,
      this.buyerName,
      this.sellerId,
      this.sellerName,
      this.items,
      this.total,
      newStatus,
      this.shippingAddress,
      this.createdAt,
      new Date().toISOString()
    );
  }

  // Calculate total from items
  calculateTotal(): number {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  // Serialization
  toDTO(): OrderDTO {
    return {
      id: this.id,
      buyerId: this.buyerId,
      buyerName: this.buyerName,
      sellerId: this.sellerId,
      sellerName: this.sellerName,
      items: this.items,
      total: this.total,
      status: this.status,
      shippingAddress: this.shippingAddress,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromDTO(dto: OrderDTO): Order {
    return new Order(
      dto.id,
      dto.buyerId,
      dto.buyerName,
      dto.sellerId,
      dto.sellerName,
      dto.items,
      dto.total,
      dto.status,
      dto.shippingAddress,
      dto.createdAt,
      dto.updatedAt
    );
  }

  // Factory method
  static create(params: {
    buyerId: string;
    buyerName: string;
    sellerId: string;
    sellerName: string;
    items: OrderItem[];
    shippingAddress: ShippingAddress;
  }): Order {
    const total = params.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return new Order(
      Date.now().toString(),
      params.buyerId,
      params.buyerName,
      params.sellerId,
      params.sellerName,
      params.items,
      total,
      'pending',
      params.shippingAddress
    );
  }
}

