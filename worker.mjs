export default {
  async fetch(request, env, ctx) {
    try {
      // 使用相对路径 fetch 静态资源
      const wasmResponse = await fetch(new URL('./php.wasm', import.meta.url));
      const wasmBuffer = await wasmResponse.arrayBuffer();

      const { instance } = await WebAssembly.instantiate(wasmBuffer, {});

      return new Response('WASM Loaded. Instance created.');
    } catch (e) {
      return new Response(`Error: ${e.message}`, { status: 500 });
    }
  }
}
