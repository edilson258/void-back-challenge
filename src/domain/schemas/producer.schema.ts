import type { Result } from "../../utils/result";
import type { DemoValidationError } from "../../error";

export type ProducerDtoCreate = {
  name: string;
  address: string;
};

export interface IProducerSchemaValidator {
  validateCreate: (
    input: any,
  ) => Result<ProducerDtoCreate, DemoValidationError>;
}
