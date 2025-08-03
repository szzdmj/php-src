import wasmModule from './php.wasm';

export default {
  async fetch(request, env, ctx) {
    try {
      // If your WASM expects imports, provide them here
      const instance = await WebAssembly.instantiate(wasmModule, {}); 
      return new Response('WASM instantiated successfully.');
    } catch (e) {
      return new Response(`Error: ${e.message}`, { status: 500 });
    }
  }
}
