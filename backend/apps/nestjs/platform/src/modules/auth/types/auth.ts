import { User } from '../../user';

export interface AuthLogin extends Pick<User, 'email' | 'id'> {
	token: string;
}
