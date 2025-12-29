/**
 * Email Value Object
 * Encapsulates and validates email
 * Principle: Value Object pattern
 */

export class Email {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
    this.validate();
  }

  private validate(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
      throw new Error('Invalid email format');
    }
  }

  toString(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return other instanceof Email && other.value === this.value;
  }

  getDomain(): string {
    return this.value.split('@')[1];
  }

  getLocalPart(): string {
    return this.value.split('@')[0];
  }

  getValue(): string {
    return this.value;
  }
}

