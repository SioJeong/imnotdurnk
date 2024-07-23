import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from '../Router.jsx';
import GlobalStyles from './shared/styles/GlobalStyles.jsx';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <GlobalStyles />
            <Router />
        </QueryClientProvider>
    );
};

export default App;
