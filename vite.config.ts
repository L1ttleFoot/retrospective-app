import { defineConfig } from 'vite'
import svgr from "vite-plugin-svgr";
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [ react({
        babel: {
          plugins: [[
            'babel-plugin-styled-components',
            {
              displayName: true,
              fileName: false
            }
          ]],
        },
      }),svgr()],
    server: {    
        open: true,
        port: 3000, 
    },
    build: {
        outDir:path.resolve(__dirname, './build'),
        emptyOutDir: true
    },
    resolve:{
        alias: {
            '@store': path.resolve(__dirname, './src/store'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@src': path.resolve(__dirname, './src'),
        }
    }
})