import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0', // 모바일에서 react 띄우기 위한 세팅
        port: 5173,
    },
    resolve: {
        extensions: ['.js', '.jsx'], // 확장자 추가
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});
