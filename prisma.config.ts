import path from 'node:path';

import 'dotenv/config';

import type { PrismaConfig } from 'prisma';

export default {
	earlyAccess: true,
	schema: path.join('backend'),
} satisfies PrismaConfig;
