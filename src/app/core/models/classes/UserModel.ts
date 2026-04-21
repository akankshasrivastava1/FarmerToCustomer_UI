export class UserLogin {
    username: string;
    password: string;
    role: number;

    constructor()
    {
        this.password = '',
        this.username = '',
        this.role = 0;
    }
}