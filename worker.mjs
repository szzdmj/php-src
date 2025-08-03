import wasm from './php.wasm';

export default {
  async fetch(request) {
    const { instance } = await WebAssembly.instantiate(wasm, {});

    // 假设 embed SAPI 已编译 index.php 内容到内存
    // 这里做个简单 echo 模拟：
    const output = "Hello from PHP WASM!"; // 你后续可以用 Emscripten FS 写入 index.php 内容

    return new Response(output, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}
