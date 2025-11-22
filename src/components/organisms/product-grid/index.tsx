import { ProductCard } from '@/components/molecules/product-card';
import { Product } from '@/types/products';

interface ProductGridProps {
  products: Product[];
  onViewDetail: (product: Product) => void;
}

export function ProductGrid({ products, onViewDetail }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground py-8">
        Không tìm thấy sản phẩm
      </p>
    );
  }

  return (
    <div
      className="
        grid gap-4
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
}
