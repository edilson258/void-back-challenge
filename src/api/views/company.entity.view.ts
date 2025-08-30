import type { CompanyEntity } from "../../domain/entities/company-entity";

export class CompanyEntityView {
  public readonly id: string;
  public readonly nome: string;
  public readonly cnpj: string;
  public readonly email: string;
  public readonly telefone: string;

  constructor(
    id: string,
    nome: string,
    cnpj: string,
    email: string,
    telefone: string,
  ) {
    this.id = id;
    this.nome = nome;
    this.cnpj = cnpj;
    this.email = email;
    this.telefone = telefone;
  }

  public static fromEntity(entity: CompanyEntity): CompanyEntityView {
    return new CompanyEntityView(
      entity.id,
      entity.name,
      entity.cnpj,
      entity.email,
      entity.phone,
    );
  }
}
