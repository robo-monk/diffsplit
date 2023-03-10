import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { optimizeImports as carbonImportOptim, optimizeCss as carbonCssOptim } from "carbon-preprocess-svelte";


/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: [preprocess(), vitePreprocess(), carbonImportOptim()],

    vite: {
        plugins: [process.env.NODE_ENV === "production" && carbonCssOptim()],
    },
    kit: {
        adapter: adapter(),
    }
};

export default config;
