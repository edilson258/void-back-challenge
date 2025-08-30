import type { Result } from "../../utils/result";
import type { DemoValidationError } from "../../error";

export type CampaignDtoCreate = {
  name: string;
  companyId: string;
  startedAt: Date;
  finishedAt: Date;
};

export interface CampaignSchemaValidator {
  validateCreate(input: any): Result<CampaignDtoCreate, DemoValidationError>;
}
