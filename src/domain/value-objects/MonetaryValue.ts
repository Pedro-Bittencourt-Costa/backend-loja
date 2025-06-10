export class MonetaryValue {

    public readonly value: number;

    private constructor(value: number) {
        this.validateValue(value);
        this.value = value;
    }

    public static fromFloat(amount: number): MonetaryValue {
        if (typeof amount !== 'number' || isNaN(amount)) {
            throw new Error('O valor fornecido deve ser um número.');
        }
        // Multiplica por 100 e arredonda para o inteiro mais próximo para obter os centavos
        const valueInCents = Math.round(amount * 100);
        return new MonetaryValue(valueInCents);
    }

    /**
     * Cria uma instância de MonetaryValue a partir de um valor já em centavos.
     * @param amount - O valor em centavos (inteiro).
     * @returns Uma nova instância de MonetaryValue.
     */
    public static fromCents(amount: number): MonetaryValue {
        return new MonetaryValue(amount);
    }

    /**
     * Valida o valor em centavos.
     * @param value - O valor a ser validado.
     */
    private validateValue(value: number): void {
        if (!Number.isSafeInteger(value)) {
            throw new Error('O valor fornecido não é um inteiro seguro.');
        }
        if (value < 0) {
            throw new Error('O valor monetário não pode ser negativo.');
        }
    }

    /**
     * Retorna o valor como um número de ponto flutuante (ex: 1050 se torna 10.50).
     * @returns O valor na sua unidade principal.
     */
    public toFloat(): number {
        return this.value / 100;
    }

    /**
     * Formata o valor como uma string de moeda.
     * @param locale - O local para formatação (padrão 'pt-BR').
     * @param currency - A moeda para formatação (padrão 'BRL').
     * @returns Uma string formatada, como "R$ 10,50".
     */
    public format(locale: string = 'pt-BR', currency: string = 'BRL'): string {
        const valueAsFloat = this.toFloat();
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency
        }).format(valueAsFloat);
    }
}