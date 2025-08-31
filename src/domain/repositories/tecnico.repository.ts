import type { Produtor } from "../entities/produtor.entity";
import type { Tecnico } from "../entities/tecnico.entity";

export interface ITecnicoRepository {
  save(tecnico: Tecnico): Promise<Tecnico>;
  findById(id: number): Promise<Tecnico | null>;
}
