const wasmCode = new Uint8Array([
  0x00,0x61,0x73,0x6d, // \0asm
  0x01,0x00,0x00,0x00  // version 1
]);

export default {
  async fetch(request) {
    const module = await WebAssembly.compile(wasmCode);
    const instance = await WebAssembly.instantiate(module);
    return new Response("Minimal wasm OK!", { headers: { 'content-type': 'text/plain' } });
  }
};
