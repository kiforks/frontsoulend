FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json nx.json tsconfig.base.json tsconfig.json prisma.config.ts ./

RUN --mount=type=cache,target=/root/.npm npm ci

COPY backend ./backend

RUN npx prisma generate && npx nx run backend/apps/nestjs/platform:build:production

FROM node:22-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/backend/prisma ./backend/prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/dist/backend/apps/nestjs/platform ./dist/backend/apps/nestjs/platform

# Run as non-root user for better security
USER node

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy --schema backend/prisma/schema.prisma && node dist/backend/apps/nestjs/platform/main.js"]
