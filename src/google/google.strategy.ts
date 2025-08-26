import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: 'http://localhost:8085/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }


    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { id, emails, displayName, photos } = profile;
        // Thường ở đây bạn sẽ lưu social_account vào DB nếu chưa có
        const user = {
            providerUserId: id,
            email: emails[0].value,
            name: displayName,
            avatar: photos[0].value,
            accessToken,
        };

        done(null, user);
    }
}
