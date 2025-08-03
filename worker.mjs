export default {
  async fetch(request, env, ctx) {
    // 读取 wasm 文件
    const wasmModuleResponse = await env.ASSETS.fetch('php.wasm');
    const wasmBuffer = await wasmModuleResponse.arrayBuffer();

    // 实例化 WebAssembly
    const wasmInstance = await WebAssembly.instantiate(wasmBuffer, {});

    return new Response('WASM Loaded. Instance created.');
  }
};
