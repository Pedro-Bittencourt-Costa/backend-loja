import { Column } from "typeorm";

export class Cep {
    @Column({name: 'cep'})
    public readonly value: string;

    private constructor(cep: string) {
        this.value = cep;
    }

    public static create(cep: string): Cep {
        if (!this.validate(cep)) {
            throw new Error('CEP inválido');
        }
        return new Cep(cep.replace(/\D/g, ''));
    }

    private static validate(cep: string): boolean {
        const cepRegex = /^\d{5}-?\d{3}$/;
        return cepRegex.test(cep);
    }

    public getValue(): string {
        // Retorna o CEP formatado
        return this.value.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
}