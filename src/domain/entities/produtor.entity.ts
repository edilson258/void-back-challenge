export class Produtor {
  constructor(
    public readonly nome: string,
    public readonly localizacao: string,
    public readonly id?: number,
  ) {}
}

export type ProdutorView = {
  nome: string;
  localizacao: string;
};
