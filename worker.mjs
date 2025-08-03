export default {
  async fetch(request, env, ctx) {
    try {
      // 读取 php.wasm 文件
      const wasmResponse = await env.ASSETS.fetch('php.wasm');
      const wasmBuffer = await wasmResponse.arrayBuffer();

      // 实例化 WebAssembly
      const { instance } = await WebAssembly.instantiate(wasmBuffer, {});

      return new Response('WASM Loaded. Instance created.');
    } catch (e) {
      return new Response(`Error: ${e.message}`, { status: 500 });
    }
  }
}
