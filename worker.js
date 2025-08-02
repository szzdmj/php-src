export default {
  async fetch(request, env, ctx) {
    // Load wasm binary
    const wasmResponse = await fetch(new URL('cloudflare/php.wasm', import.meta.url));
    const wasmBinary = await wasmResponse.arrayBuffer();
    const wasmModule = await WebAssembly.compile(wasmBinary);

    // Load index.php content (from KV or URL)
    const phpResponse = await fetch(new URL('Static_Creation/public/index.php', import.meta.url));
    const indexPhp = await phpResponse.text();

    // Initialize wasm instance (imports need to match Embed API)
    const instance = await WebAssembly.instantiate(wasmModule, {/* imports */});

    // Run PHP code (runPhp 是 wasm 导出函数)
    const result = instance.exports.runPhp(indexPhp);

    return new Response(result, {
      headers: { 'content-type': 'text/html' }
    });
  }
};
