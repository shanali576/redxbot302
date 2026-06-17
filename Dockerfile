FROM node:20-slim

# System deps: ffmpeg, imagemagick, libvips (for sharp), python3, build tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    imagemagick \
    webp \
    git \
    python3 \
    build-essential \
    libvips-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

RUN ffmpeg -version && echo "ffmpeg OK"

WORKDIR /app

COPY package.json ./

# Strip ffmpeg-static (use system binary instead)
RUN node -e "\
const pkg = JSON.parse(require('fs').readFileSync('package.json','utf8'));\
delete pkg.dependencies['ffmpeg-static'];\
delete pkg.dependencies['@ffmpeg-installer/ffmpeg'];\
require('fs').writeFileSync('package.json', JSON.stringify(pkg,null,2));\
console.log('package.json cleaned');\
"

ENV FFMPEG_PATH=/usr/bin/ffmpeg
ENV FFMPEG_SKIP_INSTALL=1
ENV NODE_ENV=production
ENV PORT=3000

# Install with sharp built from source against system libvips
RUN npm install --force --no-package-lock --no-audit --no-fund --loglevel=error \
    && npm cache clean --force

COPY . .

RUN mkdir -p temp tmp data session

EXPOSE 3000

CMD ["node", "--max-old-space-size=460", "--optimize-for-size", "--expose-gc", "index.js"]
