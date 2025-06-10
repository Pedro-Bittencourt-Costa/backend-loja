
import { ValueTransformer } from 'typeorm';
import { MonetaryValue } from './MonetaryValue';

export class MonetaryValueTransformer implements ValueTransformer {
 
  to(value: MonetaryValue | null): number | null {
    return value ? value.value : null;
  }

  from(value: number | null): MonetaryValue | null {
    return value !== null ? MonetaryValue.fromCents(value) : null;
  }
}