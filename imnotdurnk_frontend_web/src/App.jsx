import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Router from '../Router.jsx';
import GlobalStyles from './shared/styles/GlobalStyles.jsx';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5분 동안 캐시된 데이터를 최신 값으로 간주하여 데이터 재요청 X (SNS의 일반적인 데이터 갱신 주기)
            cacheTime: 1000 * 60 * 10, // 10분 동안 캐시에 데이터를 유지
            retry: 3, // 네트워크 오류 등으로 쿼리 실패 시 3번 재시도
            refetchOnWindowFocus: true, // 브라우저 창이 다시 포커스 될 때 데이터 리패치
            refetchOnReconnect: true, // 네트워크가 다시 연결될 때 데이터 리패치
            refetchOnMount: true, // 컴포넌트가 마운트 될 때마다 데이터 리패치
            suspense: false, // 데이터 로딩 상태는 useQuery에서 직접 처리
        },
        mutations: {
            retry: 2, // 데이터 CRUD 실패 시 2번 재시도
        },
    },
});

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <GlobalStyles />
            <Router />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    );
};

export default App;
