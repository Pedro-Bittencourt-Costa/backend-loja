
export class CreateAddressDto {
    
    public id?: number;
    public cep!: string;
    public street!: string;
    public district!: string;
    public number!: number;
    public reference?: string;
    public complement?: string;
    public idUser!: number;

    constructor(props?: CreateAddressDto) {
        Object.assign(this, props);
    }
}