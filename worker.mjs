export default {
  async fetch(request, env, ctx) {
    try {
      // 直接从公网 URL fetch php.wasm
      const wasmResponse = await fetch('https://php-src-workers.xianyue5165.workers.dev/php.wasm');
      const wasmBuffer = await wasmResponse.arrayBuffer();

      const { instance } = await WebAssembly.instantiate(wasmBuffer, {});

      return new Response('WASM Loaded. Instance created.');
    } catch (e) {
      return new Response(`Error: ${e.message}`, { status: 500 });
    }
  }
}
