
export class HouseNumber {
    private readonly value: number;

    private constructor(num: number) {
        this.value = num;
    }

    public static create(num: number): HouseNumber {
        if (num <= 0) {
            throw new Error('O número do endereço deve ser positivo.');
        }
        return new HouseNumber(num);
    }

    public getValue(): number {
        return this.value;
    }
}