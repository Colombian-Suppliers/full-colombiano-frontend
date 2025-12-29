/**
 * API Client Tests
 * Tests for the type-safe API client
 */

import { describe, it, expect } from 'vitest';
import { api } from '../api-client';

describe('API Client', () => {
  it('should have auth methods', () => {
    expect(api.auth).toBeDefined();
    expect(api.auth.login).toBeInstanceOf(Function);
    expect(api.auth.register).toBeInstanceOf(Function);
    expect(api.auth.getCurrentUser).toBeInstanceOf(Function);
  });

  it('should have geo methods', () => {
    expect(api.geo).toBeDefined();
    expect(api.geo.getDepartments).toBeInstanceOf(Function);
    expect(api.geo.getCities).toBeInstanceOf(Function);
  });

  it('should have products methods', () => {
    expect(api.products).toBeDefined();
    expect(api.products.list).toBeInstanceOf(Function);
    expect(api.products.getById).toBeInstanceOf(Function);
    expect(api.products.create).toBeInstanceOf(Function);
  });

  it('should have orders methods', () => {
    expect(api.orders).toBeDefined();
    expect(api.orders.list).toBeInstanceOf(Function);
    expect(api.orders.create).toBeInstanceOf(Function);
  });
});

