export default {
  async fetch(request) {
    const wasmUrl = new URL('./php.wasm', import.meta.url).toString();
    const response = await fetch(wasmUrl);
    const { instance } = await WebAssembly.instantiateStreaming(response);
    return new Response('WASM Loaded Successfully');
  }
}
