export type CampanhaCreateDto = {
  nome: string;
  empresa_id: number;
  data_inicio: Date;
  data_fim: Date;
};

export interface ICampanhaSchemaValidation {
  validateCreate: (input: any) => CampanhaCreateDto;
}
