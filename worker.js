import phpWasm from './cloudflare/php.wasm';

// index.php 不用 import，改成 fetch 动态读取
export default {
  async fetch(request, env, ctx) {
    const wasmModule = await WebAssembly.compile(phpWasm);
    const instance = await WebAssembly.instantiate(wasmModule, {});

    // 动态读取 index.php 内容
    const phpResponse = await fetch(new URL('./Static_Creation/public/index.php', import.meta.url));
    const indexPhp = await phpResponse.text();

    return new Response("WASM loaded & index.php read!", {
      headers: { 'content-type': 'text/plain' }
    });
  }
};
