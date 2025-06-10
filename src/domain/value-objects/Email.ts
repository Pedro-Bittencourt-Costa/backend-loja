import { Column } from "typeorm";

export class Email {

    @Column({name: 'email', unique: true})
    public readonly value: string;

    private constructor(email: string) {
        this.value = email;
    }

    public static create(email: string): Email {
        if (!this.validate(email)) {
            throw new Error('Email inválido');
        }
        return new Email(email);
    }

    public getValue(): string {
        return this.value;
    }

    private static validate(email: string): boolean {
        if (!email) return false;

        // Expressão regular para validar o formato do email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        return emailRegex.test(email);
    }
}