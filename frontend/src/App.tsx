import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchPage } from './pages/SearchPage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchPage />
    </QueryClientProvider>
  );
}
