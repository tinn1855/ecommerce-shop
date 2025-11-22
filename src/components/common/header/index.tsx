import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { SearchInput } from '@/components/molecules/search-input';

interface HeaderProps {
  onSearchChange: (value: string) => void;
}

export function Header({ onSearchChange }: HeaderProps) {
  const [open, setOpen] = useState(false);

  // URL params
  const [params, setParams] = useSearchParams();

  // Lấy search từ URL để khởi tạo input
  const searchFromUrl = params.get('search') || '';
  const [input, setInput] = useState(searchFromUrl);

  // Sync input khi URL thay đổi (ví dụ back/forward browser)
  useEffect(() => {
    setInput(searchFromUrl);
  }, [searchFromUrl]);

  // Debounce 300ms và update URL
  useEffect(() => {
    const timer = setTimeout(() => {
      const prevSearch = params.get('search') || '';
      if (input.trim() === '') {
        // Nếu search rỗng thì xóa khỏi URL
        if (prevSearch !== '') {
          params.delete('search');
          params.delete('page');
          setParams(params, { replace: true });
        }
      } else if (input !== prevSearch) {
        // Nếu search thực sự thay đổi thì truyền lên URL và reset page
        params.set('search', input);
        params.delete('page');
        setParams(params, { replace: true });
      }
      onSearchChange(input);
    }, 300);

    return () => clearTimeout(timer);
  }, [input, onSearchChange, params, setParams]);

  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: logo + menu mobile */}
        <div className="flex items-center gap-4">
          <button
            className="-ml-2 inline-flex items-center rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-sm bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold">E</span>
            </div>
            <span className="hidden font-semibold sm:inline">E-Shop</span>
          </Link>
        </div>

        {/* Center nav + search */}
        <div className="flex flex-1 items-center justify-center">
          <nav className="hidden gap-6 md:flex">
            <Link
              to="/"
              className="text-sm font-medium text-gray-700 hover:text-primary"
            >
              Trang chủ
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium text-gray-700 hover:text-primary"
            >
              Sản phẩm
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-gray-700 hover:text-primary"
            >
              Giới thiệu
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-gray-700 hover:text-primary"
            >
              Liên hệ
            </Link>
          </nav>

          <div className="ml-4 w-full max-w-lg md:ml-8">
            <div className="relative">
              {/* Controlled input → debounce → ghi vào URL */}
              <SearchInput value={input} onChange={setInput} />
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50"
          >
            <ShoppingCart className="h-5 w-5 text-gray-700" />
            <span className="hidden text-sm font-medium md:inline">
              Giỏ hàng
            </span>
          </Link>

          <Button variant="outline" size="sm" asChild>
            <Link to="/signin" className="inline-flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Đăng nhập</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t">
          <div className="container mx-auto flex flex-col gap-2 px-4 py-3">
            <Link to="/" onClick={() => setOpen(false)} className="py-2">
              Trang chủ
            </Link>
            <Link
              to="/products"
              onClick={() => setOpen(false)}
              className="py-2"
            >
              Sản phẩm
            </Link>
            <Link to="/about" onClick={() => setOpen(false)} className="py-2">
              Giới thiệu
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="py-2">
              Liên hệ
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
