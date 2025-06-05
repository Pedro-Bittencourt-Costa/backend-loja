import { Cep } from "../value-objects/Cep";
import { HouseNumber } from "../value-objects/HouseNumber";

export interface AddressProps {
    id?: number;
    cep: Cep;
    street: string;
    district: string;
    number: HouseNumber;
    reference: string | null;
    complement: string | null;
}

export class Address {

    private id: number | null;
    private cep: Cep;
    private street: string;
    private district: string;
    private number: HouseNumber;
    private reference: string | null;
    private complement: string | null;

    constructor(props: AddressProps) {
        this.id = props.id? props.id : null;
        this.cep = props.cep;
        this.complement = props.complement;
        this.district = props.district;
        this.number = props.number;
        this.reference = props.reference;
        this.street = props.street;
    }
}