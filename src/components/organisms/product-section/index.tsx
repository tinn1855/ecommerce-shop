import { useState, useMemo } from 'react';
import { SortSelect } from '@/components/molecules/sort-select';
import { Product } from '@/types/products';
import { ProductGrid } from '@/components/organisms/product-grid';
import { useProducts } from '@/hook/useProducts';
import { PaginationSection } from '@/components/molecules/pagination';
import { ProductDetailDialog } from '../product-dialog';
import { Spinner } from '@/components/ui/spinner';
import { useSearchParams } from 'react-router-dom';

export function ProductSection() {
  const { products, loading, error } = useProducts();

  // URL Search Params (React Router)
  const [params, setParams] = useSearchParams();

  // Lấy search từ URL
  const search = params.get('search') || '';
  // Lấy sort từ URL
  const sort = (params.get('sort') as 'asc' | 'desc' | 'none') || 'none';
  // Lấy page từ URL (mặc định 1)
  const currentPage = Number(params.get('page')) || 1;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const pageSize = 10;

  // Filter + Sort
  const filtered = useMemo(() => {
    let result = products;
    if (search.trim()) {
      const searchLower = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }
    if (sort === 'asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    return result;
  }, [products, search, sort]);
  // Xử lý thay đổi sort
  const handleSortChange = (value: 'asc' | 'desc' | 'none') => {
    if (value === 'none') {
      params.delete('sort');
      setParams(params, { replace: true });
    } else {
      params.set('sort', value);
      setParams(params, { replace: true });
    }
  };

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const start = (currentPage - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  const handlePageChange = (page: number) => {
    if (page <= 1) {
      params.delete('page');
      setParams(params, { replace: true });
    } else {
      params.set('page', String(page));
      setParams(params, { replace: true });
    }
  };

  return (
    <section className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl font-bold">Sản phẩm</h1>
        <div className="flex items-center gap-4">
          {/* Sort select */}
          <div>
            <SortSelect value={sort} onChange={handleSortChange} />
          </div>
          {/* Hiển thị số lượng kết quả */}
          {!loading && !error && (
            <p className="text-sm text-muted-foreground">
              Hiển thị {paginated.length} / {filtered.length} sản phẩm
              {search && ` cho "${search}"`}
            </p>
          )}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <Spinner className="w-12 h-12 text-primary mb-4" />
          <span className="text-primary font-semibold text-lg">
            Đang tải sản phẩm...
          </span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-500 py-10">
          <p className="text-lg font-semibold mb-2">Lỗi tải sản phẩm</p>
          <p>{error}</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filtered.length === 0 && search && (
        <div className="text-center text-muted-foreground py-10">
          <p className="text-lg font-semibold mb-2">Không tìm thấy sản phẩm</p>
          <p>Thử tìm kiếm với từ khóa khác</p>
        </div>
      )}

      {/* Grid + Pagination */}
      {!loading && !error && filtered.length > 0 && (
        <>
          <ProductGrid
            products={paginated}
            onViewDetail={(p) => {
              setSelectedProduct(p);
              setIsDetailOpen(true);
            }}
          />

          <PaginationSection
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Modal chi tiết */}
      <ProductDetailDialog
        open={isDetailOpen}
        product={selectedProduct}
        onOpenChange={setIsDetailOpen}
      />
    </section>
  );
}
