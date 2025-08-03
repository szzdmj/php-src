import phpWasm from './cloudflare/php.wasm';

// Worker fetch handler
export default {
  async fetch(request, env, ctx) {
    const { instance } = await WebAssembly.instantiate(phpWasm, {});

    // 简单响应，确认 WASM 已被加载
    return new Response("PHP wasm Worker is alive!", {
      headers: { 'content-type': 'text/plain' }
    });
  }
}
