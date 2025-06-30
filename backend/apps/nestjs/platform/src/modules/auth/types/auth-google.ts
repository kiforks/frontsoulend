import { Profile } from 'passport-google-oauth20';

export interface AuthGoogleRequest extends Request {
	user: Profile;
}
