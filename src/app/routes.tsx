import { HomePage } from '@/page/home';
import { Route, Routes } from 'react-router-dom';

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="*" element={<>404 Not Found</>} />
    </Routes>
  );
}
