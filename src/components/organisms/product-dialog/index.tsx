import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Product } from '@/types/products';
import { Button } from '@/components/ui/button';

interface ProductDetailDialogProps {
  open: boolean;
  product: Product | null;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailDialog({
  open,
  product,
  onOpenChange,
}: ProductDetailDialogProps) {
  const [quantity, setQuantity] = useState(1);
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full w-full sm:max-w-lg p-0 bg-white rounded-xl overflow-hidden max-h-screen overflow-y-auto">
        <div className="flex flex-col md:flex-row">
          {/* Image section */}
          <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-4 md:p-8">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-64 md:max-h-96 object-contain rounded-xl w-full"
            />
          </div>
          {/* Info section */}
          <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col gap-4">
            <div className="flex gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-gray-200 text-xs font-semibold text-gray-700">
                {product.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-600 text-xs font-semibold text-white">
                Featured
              </span>
            </div>
            <h2 className="text-xl md:text-3xl font-bold mb-2 text-gray-900 leading-tight line-clamp-2">
              {product.title}
            </h2>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(product.rating?.rate || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.174 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                  </svg>
                ))}
              </span>
              <span className="text-sm text-gray-500">
                ({product.rating?.count || 0} reviews)
              </span>
            </div>
            <p className="text-gray-700 text-base line-clamp-5 leading-relaxed mb-2">
              {product.description}
            </p>
            <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
              ${product.price.toFixed(2)}
            </div>

            {/* Quantity select */}
            <div className="mb-4">
              <div className="font-semibold text-sm mb-1">QUANTITY</div>
              <div className="flex items-center gap-2">
                <button
                  className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center text-lg font-bold bg-white hover:bg-gray-100"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-3 text-lg font-semibold">{quantity}</span>
                <button
                  className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center text-lg font-bold bg-white hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            {/* Action buttons */}
            <div className="flex flex-col gap-2 mb-4 w-full">
              <Button className="w-full">Add to Cart</Button>
              <Button variant={'outline'} className="w-full">
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
