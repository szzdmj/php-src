import wasmModule from './php.wasm';

export default {
  async fetch(request, env, ctx) {
    const instance = await WebAssembly.instantiate(wasmModule, {});
    return new Response('WASM instantiated successfully.');
  }
}
