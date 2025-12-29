/**
 * Money Value Object
 * Encapsulates monetary operations
 * Principle: Value Object pattern - immutable
 */

export type Currency = 'COP' | 'USD' | 'EUR';

export class Money {
  constructor(
    private readonly amount: number,
    private readonly currency: Currency = 'COP'
  ) {
    if (amount < 0) {
      throw new Error('Amount cannot be negative');
    }
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount + other.amount, this.currency);
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount - other.amount, this.currency);
  }

  multiply(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currency);
  }

  equals(other: Money): boolean {
    return (
      other instanceof Money &&
      other.amount === this.amount &&
      other.currency === this.currency
    );
  }

  isGreaterThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amount > other.amount;
  }

  isLessThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amount < other.amount;
  }

  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error('Currency mismatch');
    }
  }

  format(locale: string = 'es-CO'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: this.currency,
    }).format(this.amount);
  }

  toNumber(): number {
    return this.amount;
  }

  getCurrency(): Currency {
    return this.currency;
  }

  static zero(currency: Currency = 'COP'): Money {
    return new Money(0, currency);
  }
}

