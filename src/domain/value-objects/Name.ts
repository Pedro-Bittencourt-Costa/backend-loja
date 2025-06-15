import { Column } from "typeorm";
import { BadRequestError } from "../exception/BadRequestError";

export class Name {

    @Column({name: 'first_name'})
    public readonly first: string;

    @Column({name: 'surname'})
    public readonly surname: string;

    constructor(first: string, surname: string) {
        this.validate(first, surname);
        this.first = first;
        this.surname = surname;
    }

    private validate(first: string, surname: string): void {
        if (!first || first.trim().length < 2) {
            throw new BadRequestError('first inválido.');
        }
        if (!surname || surname.trim().length < 2) {
            throw new BadRequestError('surname inválido.');
        }
    }

    public equals(other?: Name): boolean {

        if (!other) {
            return false;
        }

        return this.first === other.first && this.surname === other.surname;
    }
}