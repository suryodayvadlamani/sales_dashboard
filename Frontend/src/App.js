import Navbar from "./components/Navbar";
import SideNav from "./components/SideNav";
import Main from "./pages/Main";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { FilterProvider } from "./providers/FilterContext";

const queryClient = new QueryClient()

function App() {
  return (


    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <div className="flex flex-col h-screen">
          <Navbar />
          <section className="flex gap-2 flex-1">
            <SideNav />
            <Main />
          </section>
        </div>
      </FilterProvider>
    </QueryClientProvider>
  );
}

export default App;
