import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/products';

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
}

export function ProductCard({ product, onViewDetail }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-sm hover:shadow-md transition-transform duration-150 hover:-translate-y-1">
      <CardHeader className="flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-40 object-contain"
        />
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <CardTitle className="line-clamp-2 text-sm mb-2">
          {product.title}
        </CardTitle>

        <p className="font-semibold text-primary mb-4">
          ${product.price.toFixed(2)}
        </p>

        <div className="mt-auto">
          <Button className="w-full" onClick={() => onViewDetail(product)}>
            Xem chi tiết
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
