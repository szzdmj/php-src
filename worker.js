// worker.js
import phpWasm from 'cloudflare/php.wasm';
import indexPhp from 'Static_Creation/public/index.php';

export default {
  async fetch(request, env, ctx) {
    const wasmModule = await WebAssembly.compile(phpWasm);
    // 这里需要根据 embed SAPI 初始化 PHP 执行环境
    // 假设您有 Embed API 的 glue code
    const instance = await WebAssembly.instantiate(wasmModule, {/* imports */});

    // 运行 PHP 处理请求
    const result = instance.exports.runPhp(indexPhp);

    return new Response(result, {
      headers: { 'content-type': 'text/html' }
    });
  }
};
