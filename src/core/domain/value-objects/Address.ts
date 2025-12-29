/**
 * Address Value Object
 * Encapsulates a complete address
 */

export interface AddressDTO {
  street: string;
  city: string;
  state: string;
  zipCode?: string;
  country: string;
  additionalInfo?: string;
}

export class Address {
  constructor(
    public readonly street: string,
    public readonly city: string,
    public readonly state: string,
    public readonly zipCode: string | undefined,
    public readonly country: string = 'Colombia',
    public readonly additionalInfo: string = ''
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.street || !this.city || !this.state) {
      throw new Error('Address must have street, city, and state');
    }
  }

  equals(other: Address): boolean {
    return (
      other instanceof Address &&
      other.street === this.street &&
      other.city === this.city &&
      other.state === this.state &&
      other.zipCode === this.zipCode &&
      other.country === this.country
    );
  }

  toString(): string {
    const parts = [this.street, this.city];
    if (this.state) parts.push(this.state);
    if (this.zipCode) parts.push(this.zipCode);
    parts.push(this.country);
    return parts.join(', ');
  }

  toDTO(): AddressDTO {
    return {
      street: this.street,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
      country: this.country,
      additionalInfo: this.additionalInfo,
    };
  }

  static fromDTO(dto: AddressDTO): Address {
    return new Address(
      dto.street,
      dto.city,
      dto.state,
      dto.zipCode,
      dto.country,
      dto.additionalInfo
    );
  }
}

