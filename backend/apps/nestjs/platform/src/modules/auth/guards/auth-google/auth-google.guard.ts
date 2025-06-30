import { AuthGuard } from '@nestjs/passport';

export class AuthGoogleGuard extends AuthGuard('google') {}
