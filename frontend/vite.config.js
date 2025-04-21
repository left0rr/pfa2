
import { defineConfig } from 'vite'

export default defineConfig({
    root: './', // already defaults to this, adjust if needed
    build: {
        rollupOptions: {
            input: 'public/index.html' // tell Vite where to look
        }
    }
})

