export type TecnicoCreateDto = {
  nome: string;
  campanha_id: number;
};

export type TecnicoListProdutoresDto = {
  id: number;
};

export interface ITecnicoSchemaValidation {
  validateCreate: (input: any) => TecnicoCreateDto;
  validateListProdutores: (input: any) => TecnicoListProdutoresDto;
}
