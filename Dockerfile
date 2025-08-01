# Dockerfile
# 构建 PHP -> WebAssembly (Emscripten)

FROM emscripten/emsdk:3.1.45 AS builder

WORKDIR /src

# 安装 PHP 源码
RUN git clone --depth=1 https://github.com/szzdmj/php-src .

# 可选：加入你维护的 patch
# COPY ./patches ./patches
# RUN patch -p1 < patches/php-emscripten.patch

# 配置构建环境
RUN ./buildconf --force && \
    emconfigure ./configure \
      --disable-all \
      --disable-cli \
      --disable-cgi \
      --enable-embed=static \
      --without-pear \
      --without-iconv \
      --without-openssl \
      --without-xml \
      --without-zlib \
      --without-pcre \
      --with-libdir=lib && \
    emmake make -j$(nproc)

# 输出 wasm 文件和 glue js
RUN mkdir -p /out && \
    cp sapi/embed/php /out/php.wasm && \
    echo "export default async function handleRequest(event) { return new Response('PHP WASM Ready') }" > /out/worker.js

# ---------- 部署阶段 ----------
FROM scratch AS export
COPY --from=builder /out /out
