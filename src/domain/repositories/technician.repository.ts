import type { DemoError } from "../../error";
import type { Result } from "../../utils/result";
import type { TechnicianEntity } from "../entities/technician.entity";

export interface ITechnicianRepository {
  save: (technician: TechnicianEntity) => Promise<Result<void, DemoError>>;
}
