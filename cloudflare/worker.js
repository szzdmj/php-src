export default {
  async fetch(request, env, ctx) {
    // 读取 PHP wasm
    const wasmResponse = await fetch(new URL('./cloudflare/php.wasm', import.meta.url));
    const wasmArrayBuffer = await wasmResponse.arrayBuffer();
    const wasmModule = await WebAssembly.compile(wasmArrayBuffer);
    const instance = await WebAssembly.instantiate(wasmModule, {
      env: {
        memory: new WebAssembly.Memory({initial: 256}),
      }
    });

    // 测试返回
    return new Response("PHP wasm Worker is alive!", {
      headers: { 'content-type': 'text/plain' }
    });
  }
};
