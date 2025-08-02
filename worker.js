import phpWasm from './cloudflare/php.wasm';

export default {
  async fetch(request, env, ctx) {
    const wasmModule = await WebAssembly.compile(phpWasm);
    const instance = await WebAssembly.instantiate(wasmModule, {});

    return new Response("WASM loaded & instantiated OK!", {
      headers: { 'content-type': 'text/plain' }
    });
  }
};
