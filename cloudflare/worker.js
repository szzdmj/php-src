import { PhpWebWorker } from '@php-wasm/web';

const BOOTSTRAP_FILE = 'index.php';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const php = new PhpWebWorker({
      wasmBinaryPath: new URL('php.wasm', import.meta.url).toString(),
    });

    const file = url.pathname === '/' ? BOOTSTRAP_FILE : decodeURIComponent(url.pathname.slice(1));

    const response = await php.run({
      documentRoot: '/',
      scriptName: `/${file}`,
      requestUrl: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers),
      body: request.body,
      files: {},
    });

    return new Response(response.body, {
      status: response.statusCode,
      headers: response.headers,
    });
  },
};
