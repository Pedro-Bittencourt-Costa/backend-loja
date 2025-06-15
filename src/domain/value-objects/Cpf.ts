import { Column } from "typeorm";
import { BadRequestError } from "../exception/BadRequestError";

export class Cpf {

    @Column({name: 'cpf', unique: true})
    public readonly value: string;

    private constructor(cpf: string) {
        this.value = cpf;
    }

    public static create(cpf: string): Cpf {
        if (!this.validate(cpf)) {
            throw new BadRequestError('CPF inválido');
        }
        // Retorna o CPF apenas com os números
        return new Cpf(cpf.replace(/\D/g, ''));
    }

    public getValue(): string {
        return this.value;
    }

    private static validate(cpf: string): boolean {
        if (!cpf) return false;

        // Remove caracteres não numéricos
        const cleanedCpf = cpf.replace(/\D/g, '');

        if (cleanedCpf.length !== 11) return false;

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1{10}$/.test(cleanedCpf)) return false;

        // Calcula os dígitos verificadores
        let sum = 0;
        let remainder: number;

        for (let i = 1; i <= 9; i++) {
            sum = sum + parseInt(cleanedCpf.substring(i - 1, i)) * (11 - i);
        }

        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }
        if (remainder !== parseInt(cleanedCpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum = sum + parseInt(cleanedCpf.substring(i - 1, i)) * (12 - i);
        }

        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }
        if (remainder !== parseInt(cleanedCpf.substring(10, 11))) return false;

        return true;
    }
}