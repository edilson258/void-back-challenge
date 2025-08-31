import { Produtor } from "../entities/produtor.entity";
import type { IProdutorRepository } from "../repositories/produtor.repository";
import type { ProdutorCreateDto } from "../schemas/produtor.schema";

export class ProdutorUseCaseCreate {
  constructor(private readonly produtorRepo: IProdutorRepository) {}

  public execute = async (dto: ProdutorCreateDto): Promise<Produtor> => {
    const produtor = new Produtor(dto.nome, dto.localizacao);
    return await this.produtorRepo.save(produtor);
  };
}
