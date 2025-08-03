export default {
  async fetch(request, env, ctx) {
    const wasmResponse = await fetch(new URL('./php.wasm', import.meta.url));
    const wasmArrayBuffer = await wasmResponse.arrayBuffer();

    // 只用 instantiate，不要 compile 再 instantiate
    const { instance } = await WebAssembly.instantiate(wasmArrayBuffer, {});

    // 这里可以调用 wasm 导出的方法
    return new Response("WASM Loaded Successfully", { status: 200 });
  }
};
