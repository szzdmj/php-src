export default {
  async fetch(request, env, ctx) {
    return new Response("PHP wasm Worker is alive!", {
      headers: { 'content-type': 'text/plain' }
    });
  }
};
