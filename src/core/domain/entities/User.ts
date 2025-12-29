/**
 * User Entity (Domain Model)
 * Represents a user in the domain
 * Follows Single Responsibility Principle
 */

export type UserRole = 'buyer' | 'seller' | 'admin';
export type PersonType = 'natural' | 'juridica';

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  phone?: string;
  documentType?: string;
  documentNumber?: string;
  birthDate?: string;
  address?: any;
}

export interface Store {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  isVerified?: boolean;
}

export interface Company {
  businessName: string;
  nit: string;
  address?: string;
  phone?: string;
}

export interface Representative {
  name: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone?: string;
}

export interface UserDTO {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  profile?: UserProfile;
  store?: Store;
  company?: Company;
  representative?: Representative;
  personType?: PersonType;
}

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly role: UserRole,
    public readonly avatar?: string,
    public readonly isActive: boolean = true,
    public readonly createdAt: string = new Date().toISOString(),
    public readonly profile?: UserProfile,
    public readonly store?: Store,
    public readonly company?: Company,
    public readonly representative?: Representative,
    public readonly personType?: PersonType
  ) {}

  // Factory methods
  static createBuyer(params: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    profile?: UserProfile;
  }): User {
    return new User(
      params.id,
      params.email,
      params.name,
      'buyer',
      params.avatar,
      true,
      new Date().toISOString(),
      params.profile
    );
  }

  static createSeller(params: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    store?: Store;
    personType?: PersonType;
    profile?: UserProfile;
    company?: Company;
    representative?: Representative;
  }): User {
    return new User(
      params.id,
      params.email,
      params.name,
      'seller',
      params.avatar,
      true,
      new Date().toISOString(),
      params.profile,
      params.store,
      params.company,
      params.representative,
      params.personType
    );
  }

  // Business logic methods
  isBuyer(): boolean {
    return this.role === 'buyer';
  }

  isSeller(): boolean {
    return this.role === 'seller';
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  hasSellerPrivileges(): boolean {
    return this.isSeller() || this.isAdmin();
  }

  canAccessSellerDashboard(): boolean {
    return this.hasSellerPrivileges() && this.isActive;
  }

  // Immutability: returns new instance instead of mutating
  deactivate(): User {
    return new User(
      this.id,
      this.email,
      this.name,
      this.role,
      this.avatar,
      false,
      this.createdAt,
      this.profile,
      this.store,
      this.company,
      this.representative,
      this.personType
    );
  }

  activate(): User {
    return new User(
      this.id,
      this.email,
      this.name,
      this.role,
      this.avatar,
      true,
      this.createdAt,
      this.profile,
      this.store,
      this.company,
      this.representative,
      this.personType
    );
  }

  updateProfile(profile: UserProfile): User {
    return new User(
      this.id,
      this.email,
      this.name,
      this.role,
      this.avatar,
      this.isActive,
      this.createdAt,
      profile,
      this.store,
      this.company,
      this.representative,
      this.personType
    );
  }

  // Serialization for persistence/API
  toDTO(): UserDTO {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role,
      avatar: this.avatar,
      isActive: this.isActive,
      createdAt: this.createdAt,
      ...(this.profile && { profile: this.profile }),
      ...(this.store && { store: this.store }),
      ...(this.company && { company: this.company }),
      ...(this.representative && { representative: this.representative }),
      ...(this.personType && { personType: this.personType }),
    };
  }

  static fromDTO(dto: UserDTO): User {
    return new User(
      dto.id,
      dto.email,
      dto.name,
      dto.role,
      dto.avatar,
      dto.isActive,
      dto.createdAt,
      dto.profile,
      dto.store,
      dto.company,
      dto.representative,
      dto.personType
    );
  }
}

