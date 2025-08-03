import PHP_WASM from './php.wasm';

export default {
  async fetch(request, env, ctx) {
    const { instance } = await WebAssembly.instantiate(PHP_WASM, {});
    return new Response("WASM Loaded Successfully", { status: 200 });
  }
};
