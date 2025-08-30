export class CompanyEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly cnpj: string,
    public readonly email: string,
    public readonly phone: string,
    // Note: we can also add fields like: createdAt, ...
  ) {}
}
