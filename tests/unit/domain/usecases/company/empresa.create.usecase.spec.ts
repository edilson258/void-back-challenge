import { describe, expect, it } from "vitest";
import type { EmpresaCreateDto } from "../../../../../src/domain/schemas/empresa.schema";
import { EmpresaUseCaseCreate } from "../../../../../src/domain/usecases/empresa.usecase.create";
import { EmpresaRepositoryMock } from "../../../../mock/domain/repositories/empresa.repository.mock";

describe("Create empresa use case", () => {
	const empresaRepo = new EmpresaRepositoryMock();
	const usecase = new EmpresaUseCaseCreate(empresaRepo);

	it("should create an empresa", async () => {
		const dto: EmpresaCreateDto = {
			cnpj: "12345678901234",
			email: "teste@teste.com",
			nome: "Empresa Teste",
			telefone: "1234567890",
		};

		const empresa = await usecase.execute(dto);

		expect(empresa).toBeDefined();
		expect(empresa.id).toBeDefined();
		expect(empresa.cnpj).toBe(dto.cnpj);
		expect(empresa.email).toBe(dto.email);
		expect(empresa.nome).toBe(dto.nome);
		expect(empresa.telefone).toBe(dto.telefone);
	});
});
