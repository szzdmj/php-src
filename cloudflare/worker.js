import phpWasm from './php.wasm';
import indexPhp from './Static_Creation/public/index.php';

export default {
  async fetch(request, env, ctx) {
    const wasmModule = await WebAssembly.compile(phpWasm);
    const instance = await WebAssembly.instantiate(wasmModule, {
      env: {
        // 补充必要的 env，如 memory, table, fd_write, 等
        // 若你使用 embed SAPI，理论上 _main 会自动运行 index.php
      }
    });

    if (instance.exports._main) {
      instance.exports._main(); // 启动 php.wasm（运行 embed index.php）
    }

    return new Response('PHP WASM executed (placeholder)', {
      status: 200
    });
  }
}
