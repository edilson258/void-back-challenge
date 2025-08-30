import type { Result } from "../../utils/result";
import type { DemoValidationError } from "../../error";

export type TechnicianDtoCreate = {
  name: string;
  campaignId: string;
};

export interface ITechnicianSchemaValidator {
  validateCreate(input: any): Result<TechnicianDtoCreate, DemoValidationError>;
}
