import { VoidError } from "../../error";
import { ProdutorCampanha } from "../entities/produtor-campanha.assign";

import type { IProdutorCampanhaRepository } from "../repositories/produtor-campanha.repository";
import type { ITecnicoRepository } from "../repositories/tecnico.repository";
import type { ProdutorCampanhaReassignDto } from "../schemas/produtor-campanha.schema";

export class ProdutorCampanhaUseCaseReassign {
  constructor(
    private readonly tecnicoRepo: ITecnicoRepository,
    private readonly produtorCampanhaRepo: IProdutorCampanhaRepository,
  ) {}

  public execute = async (
    dto: ProdutorCampanhaReassignDto,
  ): Promise<ProdutorCampanha> => {
    const tecnico_novo = await this.tecnicoRepo.findById(dto.tecnico_novo_id);
    if (!tecnico_novo) {
      throw new VoidError("ENTRY_NOT_FOUND", "Tecnico novo nao existe");
    }
    const tecnico_antigo = await this.tecnicoRepo.findById(
      dto.tecnico_antigo_id,
    );
    if (!tecnico_antigo) {
      throw new VoidError("ENTRY_NOT_FOUND", "Tecnico antigo nao existe");
    }

    const tecnicoNovoInCampanha =
      await this.produtorCampanhaRepo.findByTecnicoAndActiveCampanha(
        dto.tecnico_novo_id,
        dto.campanha_id,
      );
    if (tecnicoNovoInCampanha) {
      throw new VoidError(
        "ENTRY_COLLISION",
        "Novo tecnico esta atribuido em outra campanha",
      );
    }

    const oldProdutorCampanha =
      await this.produtorCampanhaRepo.findByTecnicoAndProductorAndActiveCampanha(
        dto.tecnico_antigo_id,
        dto.produtor_id,
        dto.campanha_id,
      );

    if (!oldProdutorCampanha) {
      throw new VoidError(
        "ENTRY_NOT_FOUND",
        "O tecnico antigo nao esta atribuido ao produtor em nenhuma campanha a decorer",
      );
    }

    await this.produtorCampanhaRepo.updateTecnico(
      oldProdutorCampanha.id!,
      dto.tecnico_novo_id,
    );

    return {
      ...oldProdutorCampanha,
      tecnico_id: dto.tecnico_novo_id,
    };
  };
}
