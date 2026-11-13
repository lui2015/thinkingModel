FROM node:22-alpine AS builder
WORKDIR /app
ARG NPM_REGISTRY=https://registry.npmjs.org
COPY package.json package-lock.json ./
RUN npm ci --registry=$NPM_REGISTRY --include=optional --fetch-retries=5 --fetch-retry-mintimeout=20000 --fetch-retry-maxtimeout=120000
# alpine 需要 musl 版 SWC；网络抖动可能让可选依赖漏装，这里补装兜底
RUN if [ ! -d node_modules/@next/swc-linux-x64-musl ]; then npm install --no-save --no-package-lock --registry=$NPM_REGISTRY @next/swc-linux-x64-musl@$(node -p "require('next/package.json').version"); fi
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
