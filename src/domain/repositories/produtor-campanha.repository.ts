import type { Produtor } from "../entities/produtor.entity";
import type { ProdutorCampanha } from "../entities/produtor-campanha.assign";

export interface IProdutorCampanhaRepository {
	save(produtorCampanha: ProdutorCampanha): Promise<ProdutorCampanha>;
	updateTecnico(id: number, novoTecnicoId: number): Promise<void>;

	listProdutoresByTecnicoId(id: number): Promise<Produtor[]>;

	findByTecnicoAndActiveCampanha(
		tecnicoId: number,
		campanhaId: number,
	): Promise<ProdutorCampanha | null>;

	findByTecnicoAndProductorAndActiveCampanha(
		tecnicoId: number,
		produtorId: number,
		campanhaId: number,
	): Promise<ProdutorCampanha | null>;

	findByProdutorAndActiveCampanha(
		produtorId: number,
		campanhaId: number,
	): Promise<ProdutorCampanha | null>;
}
