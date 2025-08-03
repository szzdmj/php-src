export default {
  async fetch(request, env, ctx) {
    try {
      const wasmModule = await WebAssembly.instantiateStreaming(fetch('/php.wasm'));
      const wasmResponse = await fetch(wasmUrl);
      const wasmArrayBuffer = await wasmResponse.arrayBuffer();
      const wasmModule = await WebAssembly.compile(wasmArrayBuffer);
      const instance = await WebAssembly.instantiate(wasmModule, {
        env: {
          memory: new WebAssembly.Memory({ initial: 256 }),
        },
      });

      return new Response('PHP wasm loaded successfully!', {
        headers: { 'Content-Type': 'text/plain' },
      });
    } catch (e) {
      return new Response('WASM load error: ' + e.message, {
        status: 500,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  }
};
