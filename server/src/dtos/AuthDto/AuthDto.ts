import UserDto from '../UserDto';


class AuthDto {
    accessToken: string;

    refreshToken: string;
    
    user: UserDto;
    
    constructor(accessToken: string, refreshToken: string, user: UserDto) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.user = user;
    }
}

export default AuthDto;
