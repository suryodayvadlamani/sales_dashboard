import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Main />
    </QueryClientProvider>
  );
}

export default App;
