# Dockerfile: build PHP to WebAssembly for Cloudflare Workers
FROM emscripten/emsdk:3.1.45

# Copy source code (assume bind mount or COPY from repo)
WORKDIR /src
COPY . /src

# Install build dependencies (some are no-op in emscripten)
RUN apt-get update && apt-get install -y \
    autoconf automake libtool re2c bison flex \
    libxml2-dev libsqlite3-dev libonig-dev libcurl4-openssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Patch or override php-src files here if needed
COPY ./wasm_overlay/ /src/

# Configure and build PHP to wasm
RUN ./buildconf && \
    emconfigure ./configure \
        --disable-all \
        --enable-embed=static \
        --without-pear \
        --disable-cli \
        --enable-session --enable-tokenizer --enable-filter --enable-json --enable-mbstring \
        --with-libxml --with-curl --with-zlib \
        CFLAGS="-O3" && \
    emmake make -j$(nproc)

# Final copy-out: php.wasm and bootstrap JS
CMD ["/bin/bash"]
