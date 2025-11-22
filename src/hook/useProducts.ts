import { Product } from '@/types/products';
import { useEffect, useState } from 'react';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('https://fakestoreapi.com/products', {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error('Không thể tải danh sách sản phẩm');
        }

        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Đã xảy ra lỗi');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  return { products, loading, error };
}
