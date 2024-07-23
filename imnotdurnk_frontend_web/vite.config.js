import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    resolve: {
        extensions: ['.js', '.jsx'], // 확장자 추가
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});
