
export class AddressDto {
    
    public id?: number;
    public cep!: string;
    public street!: string;
    public district!: string;
    public number!: number;
    public reference?: string;
    public complement?: string;

    constructor(props?: AddressDto) {
        Object.assign(this, props);
    }
}