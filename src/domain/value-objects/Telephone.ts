import { Column } from "typeorm";
import { BadRequestError } from "../exception/BadRequestError";

export class Telephone {

    @Column({name: 'telephone', unique: true})
    public readonly value: string;

    private constructor(telephone: string) {
        this.value = telephone;
    }

    public static create(telephone: string): Telephone {
        if (!this.validate(telephone)) {
            throw new BadRequestError('Telefone inválido');
        }
        // Retorna o telefone apenas com os números
        return new Telephone(telephone.replace(/\D/g, ''));
    }
    
    public getValue(): string {
        return this.value;
    }

    private static validate(telephone: string): boolean {
        if (!telephone) return false;

        // Remove caracteres não numéricos
        const cleanedTelephone = telephone.replace(/\D/g, '');

        // Expressão regular para validar telefones brasileiros (fixo e celular com 9º dígito)
        // Aceita números com 10 ou 11 dígitos (DDD + número)
        const telephoneRegex = /^(?:[1-9]{2})?(?:[2-9][0-9]{3}|9[1-9][0-9]{3})[0-9]{4}$/;
        
        return telephoneRegex.test(cleanedTelephone);
    }
}