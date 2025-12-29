/**
 * Product Entity (Domain Model)
 * Represents a product in the domain
 */

export interface ProductDTO {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
  categoryName: string;
  sellerId: string;
  sellerName: string;
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  isActive: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export class Product {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly price: number,
    public readonly images: string[] = [],
    public readonly categoryId: string,
    public readonly categoryName: string,
    public readonly sellerId: string,
    public readonly sellerName: string,
    public readonly stock: number,
    public readonly rating: number = 0,
    public readonly reviewCount: number = 0,
    public readonly tags: string[] = [],
    public readonly isActive: boolean = true,
    public readonly featured: boolean = false,
    public readonly createdAt: string = new Date().toISOString(),
    public readonly updatedAt: string = new Date().toISOString()
  ) {}

  // Business logic
  isAvailable(): boolean {
    return this.isActive && this.stock > 0;
  }

  hasStock(quantity: number): boolean {
    return this.stock >= quantity;
  }

  isFeatured(): boolean {
    return this.featured;
  }

  isLowStock(threshold: number = 10): boolean {
    return this.stock < threshold;
  }

  // Immutability
  decreaseStock(quantity: number): Product {
    if (!this.hasStock(quantity)) {
      throw new Error(`Insufficient stock for product ${this.title}`);
    }
    return new Product(
      this.id,
      this.title,
      this.description,
      this.price,
      this.images,
      this.categoryId,
      this.categoryName,
      this.sellerId,
      this.sellerName,
      this.stock - quantity,
      this.rating,
      this.reviewCount,
      this.tags,
      this.isActive,
      this.featured,
      this.createdAt,
      new Date().toISOString()
    );
  }

  increaseStock(quantity: number): Product {
    return new Product(
      this.id,
      this.title,
      this.description,
      this.price,
      this.images,
      this.categoryId,
      this.categoryName,
      this.sellerId,
      this.sellerName,
      this.stock + quantity,
      this.rating,
      this.reviewCount,
      this.tags,
      this.isActive,
      this.featured,
      this.createdAt,
      new Date().toISOString()
    );
  }

  updatePrice(newPrice: number): Product {
    if (newPrice < 0) {
      throw new Error('Price cannot be negative');
    }
    return new Product(
      this.id,
      this.title,
      this.description,
      newPrice,
      this.images,
      this.categoryId,
      this.categoryName,
      this.sellerId,
      this.sellerName,
      this.stock,
      this.rating,
      this.reviewCount,
      this.tags,
      this.isActive,
      this.featured,
      this.createdAt,
      new Date().toISOString()
    );
  }

  deactivate(): Product {
    return new Product(
      this.id,
      this.title,
      this.description,
      this.price,
      this.images,
      this.categoryId,
      this.categoryName,
      this.sellerId,
      this.sellerName,
      this.stock,
      this.rating,
      this.reviewCount,
      this.tags,
      false,
      this.featured,
      this.createdAt,
      new Date().toISOString()
    );
  }

  activate(): Product {
    return new Product(
      this.id,
      this.title,
      this.description,
      this.price,
      this.images,
      this.categoryId,
      this.categoryName,
      this.sellerId,
      this.sellerName,
      this.stock,
      this.rating,
      this.reviewCount,
      this.tags,
      true,
      this.featured,
      this.createdAt,
      new Date().toISOString()
    );
  }

  updateRating(newRating: number, newReviewCount: number): Product {
    return new Product(
      this.id,
      this.title,
      this.description,
      this.price,
      this.images,
      this.categoryId,
      this.categoryName,
      this.sellerId,
      this.sellerName,
      this.stock,
      newRating,
      newReviewCount,
      this.tags,
      this.isActive,
      this.featured,
      this.createdAt,
      new Date().toISOString()
    );
  }

  // Serialization
  toDTO(): ProductDTO {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      price: this.price,
      images: this.images,
      categoryId: this.categoryId,
      categoryName: this.categoryName,
      sellerId: this.sellerId,
      sellerName: this.sellerName,
      stock: this.stock,
      rating: this.rating,
      reviewCount: this.reviewCount,
      tags: this.tags,
      isActive: this.isActive,
      featured: this.featured,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromDTO(dto: ProductDTO): Product {
    return new Product(
      dto.id,
      dto.title,
      dto.description,
      dto.price,
      dto.images,
      dto.categoryId,
      dto.categoryName,
      dto.sellerId,
      dto.sellerName,
      dto.stock,
      dto.rating,
      dto.reviewCount,
      dto.tags,
      dto.isActive,
      dto.featured,
      dto.createdAt,
      dto.updatedAt
    );
  }
}

