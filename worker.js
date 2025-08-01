// worker.js
import phpWasm from 'cloudflare/php.wasm';
import indexPhp from 'Static_Creation/public/index.php';

export default {
  async fetch(request, env, ctx) {
    const { instance } = await WebAssembly.instantiate(phpWasm, {
      env: {
        // 这里可以根据需要添加导入的函数，如 memory, table, imports 等
      }
    });

    // 简单示例：返回 index.php 文件内容
    return new Response(indexPhp, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
};
