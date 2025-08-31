import { VoidError } from "../../error";

import type { ProdutorView } from "../entities/produtor.entity";
import type { ITecnicoRepository } from "../repositories/tecnico.repository";
import type { TecnicoListProdutoresDto } from "../schemas/tecnico.schema";
import type { IProdutorCampanhaRepository } from "../repositories/produtor-campanha.repository";

export class TecnicoUseCaseListProdutores {
  constructor(
    private readonly tecnicoRepository: ITecnicoRepository,
    private readonly produtorCampanhaRepository: IProdutorCampanhaRepository,
  ) {}

  public execute = async (
    dto: TecnicoListProdutoresDto,
  ): Promise<ProdutorView[]> => {
    if (!(await this.tecnicoRepository.findById(dto.id))) {
      throw new VoidError("ENTRY_NOT_FOUND", "Tecnico nao existe");
    }
    return await this.produtorCampanhaRepository.listProdutoresByTecnicoId(
      dto.id,
    );
  };
}
