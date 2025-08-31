export type ProdutorCreateDto = {
  nome: string;
  localizacao: string;
};

export interface IProdutorSchemaValidation {
  validateCreate: (input: any) => ProdutorCreateDto;
}
