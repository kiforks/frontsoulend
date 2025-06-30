import { User } from '@prisma/client';

export interface AuthLogin extends Pick<User, 'email' | 'id'> {
	token: string;
}
