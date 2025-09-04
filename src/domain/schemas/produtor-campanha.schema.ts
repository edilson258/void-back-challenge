export type ProdutorCampanhaAssignDto = {
	produtor_id: number;
	tecnico_id: number;
	campanha_id: number;
};

export type ProdutorCampanhaReassignDto = {
	produtor_id: number;
	tecnico_antigo_id: number;
	tecnico_novo_id: number;
	campanha_id: number;
};

export interface IProdutorCampanhaSchemaValidation {
	validateAssign: (input: unknown) => ProdutorCampanhaAssignDto;
	validateReassign: (input: unknown) => ProdutorCampanhaReassignDto;
}
