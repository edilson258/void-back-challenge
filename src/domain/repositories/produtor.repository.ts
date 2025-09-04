import type { Produtor } from "../entities/produtor.entity";

export interface IProdutorRepository {
	save(produtor: Produtor): Promise<Produtor>;
	findById(id: number): Promise<Produtor | null>;
}
