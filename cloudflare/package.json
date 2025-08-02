import phpWasm from './cloudflare/php.wasm';
import indexPhp from './Static_Creation/public/index.php';

export default {
  async fetch(request, env, ctx) {
    const wasmModule = await WebAssembly.compile(phpWasm);
    const instance = await WebAssembly.instantiate(wasmModule, {});

    return new Response("WASM loaded & instantiated!", {
      headers: { 'content-type': 'text/plain' }
    });
  }
};
