import {Service} from "typedi";
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';
import {IUsersContent} from "./types/IUsersContent";
import {IUserInfo} from "./types/IUserInfo";

@Service()
export class AuthService {
    private authFileName = path.join(__dirname, '../../users.json');

    private getFileContent(): IUsersContent {
        return JSON.parse(fs.readFileSync(this.authFileName).toString());
    }

    public getUserByEmail(email: string): IUserInfo | null {
        const users = this.getFileContent();
        const user = users[email];
        return user ? user : null;
    }

    public async saveUser(email: string, password: string, name: string): Promise<void> {
        const users = this.getFileContent();
        const existedUser = users[email];
        if (existedUser) {
            throw new Error(`User with email ${email} already exist`);
        }
        const passwordHash = await bcrypt.hash(password, 10);
        users[email] = {
            email,
            name,
            passwordHash
        };
        fs.writeFileSync(this.authFileName, JSON.stringify(users))
    }

    public async checkPassword(email: string, password: string): Promise<boolean> {
        const users = this.getFileContent();
        const existedUser = users[email];
        if (!existedUser) {
            throw new Error(`User with email ${email} does not exist`);
        }
        return bcrypt.compare(password, existedUser.passwordHash);
    }
}