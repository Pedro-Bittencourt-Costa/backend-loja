import { ResponseUserDto } from "./ResponseUserDto";


export class ResponseAddressDto {
    
    public id?: number;
    public cep!: string;
    public street!: string;
    public district!: string;
    public number!: number;
    public reference!: string | null;
    public complement!: string | null;
    public user?: ResponseUserDto;

    constructor(props?: ResponseAddressDto) {
        Object.assign(this, props);
    }
}