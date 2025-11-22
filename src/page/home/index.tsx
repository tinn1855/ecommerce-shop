import { Footer } from '@/components/common/footer/footer';
import { Header } from '@/components/common/header';
import { ProductSection } from '@/components/organisms/product-section';

export const HomePage = () => {
  const handleSearchChange = (value: string) => {
    console.log('Search changed:', value);
  };

  return (
    <>
      <Header onSearchChange={handleSearchChange} />
      <ProductSection />
      <Footer />
    </>
  );
};
