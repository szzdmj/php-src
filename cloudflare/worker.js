export default {
  async fetch(request, env, ctx) {
    // 读取 PHP wasm
    const wasmResponse = await fetch(new URL('./cloudflare/php.wasm', import.meta.url));
    const wasmArrayBuffer = await wasmResponse.arrayBuffer();
    const wasmModule = await WebAssembly.compile(wasmArrayBuffer);
    const instance = await WebAssembly.instantiate(wasmModule, {
      env: {
        // 这里预留必要的 imports，可逐步扩展
        memory: new WebAssembly.Memory({initial: 256}),
      }
    });

    // 简单返回实例存在的消息（下一步再运行 index.php）
    return new Response("PHP wasm Worker is alive!", {
      headers: { 'content-type': 'text/plain' }
    });
  }
};
