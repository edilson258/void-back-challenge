import { VoidError } from "../../error";
import { Tecnico } from "../entities/tecnico.entity";
import type { ICampanhaRepository } from "../repositories/campanha.repository";
import type { ITecnicoRepository } from "../repositories/tecnico.repository";
import type { TecnicoCreateDto } from "../schemas/tecnico.schema";

export class TecnicoUseCaseCreate {
  constructor(
    private readonly tecnicoRepo: ITecnicoRepository,
    private readonly campanhaRepo: ICampanhaRepository,
  ) {}

  public execute = async (dto: TecnicoCreateDto): Promise<Tecnico> => {
    const campanha = await this.campanhaRepo.findById(dto.campanha_id);
    if (!campanha) {
      throw new VoidError("ENTRY_NOT_FOUND", "Campanha nao existe");
    }
    const tecnico = new Tecnico(dto.nome, dto.campanha_id);
    return await this.tecnicoRepo.save(tecnico);
  };
}
