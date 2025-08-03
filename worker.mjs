export default {
  async fetch(request) {
    const wasmUrl = new URL('./php.wasm', import.meta.url).toString();
    const wasmModule = await fetch(wasmUrl).then(res => res.arrayBuffer());
    const { instance } = await WebAssembly.instantiate(wasmModule, {});
    return new Response('WASM Loaded');
  }
}
