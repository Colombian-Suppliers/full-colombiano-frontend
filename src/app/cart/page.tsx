'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { EmptyState, QuantitySelector } from '@/components/common';
import { MdDelete, MdShoppingCart } from 'react-icons/md';
import toast from 'react-hot-toast';

interface CartItem {
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
  };
  quantity: number;
}

interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

/**
 * Cart Page
 * Complete shopping cart with checkout functionality
 */
export default function CartPage() {
  const router = useRouter();
  
  // TODO: Replace with actual cart store (Zustand)
  const [items, setItems] = useState<CartItem[]>([]);
  
  const [checkoutData, setCheckoutData] = useState<{ shippingAddress: ShippingAddress }>({
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Colombia',
    },
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const removeItem = (productId: string) => {
    setItems(items.filter((item) => item.product.id !== productId));
    toast.success('Producto eliminado del carrito');
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setItems(
      items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotal = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const handleCheckoutDataChange = (field: keyof ShippingAddress, value: string) => {
    setCheckoutData((prev) => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [field]: value,
      },
    }));
  };

  const handlePlaceOrder = async () => {
    // Validate shipping address
    const { shippingAddress } = checkoutData;
    if (
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.zipCode ||
      !shippingAddress.country
    ) {
      toast.error('Por favor completa todos los campos de dirección de envío');
      return;
    }

    setPlacingOrder(true);
    try {
      const orderData = {
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        shippingAddress,
      };

      // TODO: await orderApiService.createOrder(orderData);
      clearCart();
      toast.success('¡Pedido creado exitosamente!');
      router.push('/buyer/orders');
    } catch (error) {
      toast.error('Error al crear el pedido');
    } finally {
      setPlacingOrder(false);
    }
  };

  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>
        <EmptyState
          icon={<MdShoppingCart className="inline-block text-gray-300" />}
          title="Tu carrito está vacío"
          description="¡Explora nuestro marketplace y agrega algunos productos!"
          actionLabel="Explorar Productos"
          onAction={() => router.push('/marketplace')}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">
              Productos en tu carrito ({items.length})
            </h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <img
                    src={
                      item.product.images[0] ||
                      '/placeholder-product.png'
                    }
                    alt={item.product.title}
                    className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1 truncate">
                      {item.product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {item.product.description}
                    </p>
                    <p className="text-green-600 font-semibold text-lg">
                      ${item.product.price.toLocaleString('es-CO')}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <QuantitySelector
                      quantity={item.quantity}
                      onQuantityChange={(newQty) =>
                        handleQuantityChange(item.product.id, newQty)
                      }
                      min={1}
                      max={99}
                    />

                    <p className="font-bold text-lg">
                      $
                      {(item.product.price * item.quantity).toLocaleString(
                        'es-CO'
                      )}
                    </p>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      <MdDelete className="w-4 h-4" />
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal ({items.length} productos)</span>
                <span className="font-medium">
                  ${total.toLocaleString('es-CO')}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Envío</span>
                <span className="font-medium text-green-600">Gratis</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-green-600">
                  ${total.toLocaleString('es-CO')}
                </span>
              </div>
            </div>

            {!showCheckout ? (
              <Button className="w-full" onClick={() => setShowCheckout(true)}>
                Proceder al checkout
              </Button>
            ) : (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-t pt-4">
                  Dirección de envío
                </h3>

                <Input
                  placeholder="Calle y número *"
                  value={checkoutData.shippingAddress.street}
                  onChange={(e) =>
                    handleCheckoutDataChange('street', e.target.value)
                  }
                  required
                />

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Ciudad *"
                    value={checkoutData.shippingAddress.city}
                    onChange={(e) =>
                      handleCheckoutDataChange('city', e.target.value)
                    }
                    required
                  />
                  <Input
                    placeholder="Departamento *"
                    value={checkoutData.shippingAddress.state}
                    onChange={(e) =>
                      handleCheckoutDataChange('state', e.target.value)
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Código postal *"
                    value={checkoutData.shippingAddress.zipCode}
                    onChange={(e) =>
                      handleCheckoutDataChange('zipCode', e.target.value)
                    }
                    required
                  />
                  <Input
                    placeholder="País *"
                    value={checkoutData.shippingAddress.country}
                    onChange={(e) =>
                      handleCheckoutDataChange('country', e.target.value)
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowCheckout(false)}
                    className="w-full"
                  >
                    ← Volver al carrito
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={placingOrder}
                    className="w-full"
                  >
                    {placingOrder ? 'Procesando...' : '✓ Confirmar pedido'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

