import type { Campanha } from "../entities/campanha.entity";

export interface ICampanhaRepository {
  save(campanha: Campanha): Promise<Campanha>;
  findById(id: number): Promise<Campanha | null>;
}
