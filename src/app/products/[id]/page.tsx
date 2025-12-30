'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import { StarRating, QuantitySelector, LoadingSpinner, EmptyState } from '@/components/common';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  stock: number;
  category: string;
  sellerName: string;
  tags?: string[];
}

interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}

/**
 * Product Detail Page
 * Complete product view with images, details, and reviews
 */
export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        // TODO: const productData = await productApiService.getProductById(id);
        // setProduct(productData);
        // const reviewsData = await reviewApiService.getProductReviews(id);
        // setReviews(reviewsData);
        setProduct(null);
        setReviews([]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    setAddingToCart(true);
    try {
      // TODO: await cartStore.addItem(product, quantity);
      toast.success(`¡${product.title} agregado al carrito!`);
    } catch (error) {
      toast.error('Error al agregar al carrito');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <LoadingSpinner centered size="lg" message="Cargando producto..." />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
        <Button onClick={() => router.push('/marketplace')}>
          Volver al marketplace
        </Button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Producto no encontrado</h1>
        <Button onClick={() => router.push('/marketplace')}>
          Volver al marketplace
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <img
              src={
                product.images[selectedImage] ||
                '/placeholder-product.png'
              }
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg border border-gray-200"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition-all ${
                    selectedImage === index
                      ? 'border-primary-500 scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} showValue />
              <span className="text-gray-500">
                ({product.reviewCount} reseñas)
              </span>
            </div>
            <span
              className={`text-sm px-3 py-1 rounded-full font-medium ${
                product.isActive
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {product.isActive ? 'En stock' : 'Agotado'}
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl font-bold text-green-600">
                ${product.price.toLocaleString('es-CO')}
              </span>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice.toLocaleString('es-CO')}
                  </span>
                )}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                {Math.round((1 - product.price / product.originalPrice) * 100)}%
                de descuento
              </span>
            )}
          </div>

          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">Descripción</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          <div className="mb-6 bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Categoría:</span>
              <span className="text-sm text-gray-900">{product.category}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Stock disponible:</span>
              <span className="text-sm text-gray-900 font-semibold">
                {product.stock} unidades
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Vendido por:</span>
              <span className="text-sm text-gray-900">{product.sellerName}</span>
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-lg">Cantidad:</label>
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  min={1}
                  max={product.stock}
                  size="lg"
                />
              </div>

              <Button
                className="w-full text-lg py-6"
                onClick={handleAddToCart}
                disabled={
                  addingToCart || !product.isActive || product.stock === 0
                }
              >
                {addingToCart
                  ? 'Agregando...'
                  : !product.isActive || product.stock === 0
                    ? 'Producto no disponible'
                    : `Agregar al carrito - $${(product.price * quantity).toLocaleString('es-CO')}`}
              </Button>
            </div>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="mb-6">
              <p className="font-semibold mb-3">Etiquetas:</p>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 border-t pt-12">
        <h2 className="text-3xl font-bold mb-6">Reseñas de clientes</h2>

        {reviews.length === 0 ? (
          <EmptyState
            icon="💬"
            title="No hay reseñas aún"
            description="¡Sé el primero en opinar sobre este producto!"
          />
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                      <span className="font-semibold text-lg">
                        {review.userName}
                      </span>
                      <div className="flex items-center gap-2">
                        <StarRating rating={review.rating} size="sm" />
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {review.comment}
                    </p>
                    <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                      👍 Útil ({review.helpful})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

