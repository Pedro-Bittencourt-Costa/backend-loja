import { Column } from "typeorm";
import { BadRequestError } from "../exception/BadRequestError";

export class Name {

    @Column({name: 'first_name'})
    public readonly first_name!: string;

    @Column({name: 'surname'})
    public readonly surname!: string;

    constructor(props?: Name) {
        if(props) {
            console.log(props.first_name, props.surname)
            this.validate(props.first_name, props.surname);
            this.first_name = props.first_name;
            this.surname = props.surname;
        }
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

        return this.first_name === other.first_name && this.surname === other.surname;
    }
}