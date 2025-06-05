import { compare, hash } from "bcrypt";

export class HashedPassword {

    private readonly value: string;

    private constructor(hashedPassword: string){
        this.value = hashedPassword;
    }

    public static async create(plainPassword: string): Promise<HashedPassword> {
        if (plainPassword.trim() === "") {
            throw new Error("A senha não pode estar vazia."); 
        }
        const hashedPassword = await hash(plainPassword, 10);
        return new HashedPassword(hashedPassword);
    }

    public checkPassword(password: string): Promise<boolean> {
        return compare(password, this.value);
    }

    public getValue(): string {
        return this.value;
    }
}