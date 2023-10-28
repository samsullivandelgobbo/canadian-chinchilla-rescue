import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    csp: {
      directives: {
        'script-src': ['self'],
        'connect-src': ['vitals.vercel-insights.com']
      },
    },
  },
  preprocess: vitePreprocess()
};
export default config;