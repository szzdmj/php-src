import phpWasm from 'phpWasm';

export default {
  async fetch(request, env, ctx) {
    const wasmModule = await WebAssembly.compile(phpWasm);
    const instance = await WebAssembly.instantiate(wasmModule, { /* empty imports */ });

    return new Response("WASM loaded & instantiated!", {
      headers: { 'content-type': 'text/plain' }
    });
  }
};
