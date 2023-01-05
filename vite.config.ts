import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default ({ mode }) => {
    Object.assign(process.env, loadEnv(mode, process.cwd()));
    return defineConfig({
        server: {
            port: process.env.VITE_PORT,
        },
        plugins: [react(), tsconfigPaths()],
    })
};

