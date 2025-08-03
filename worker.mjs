export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/php.wasm') {
      // 读取 cloudflare/php.wasm 文件
      const asset = await env.ASSETS.fetch('php.wasm');
      return new Response(asset.body, {
        headers: { 'Content-Type': 'application/wasm' }
      });
    }

    // 默认返回
    return new Response('Worker is alive');
  }
};
