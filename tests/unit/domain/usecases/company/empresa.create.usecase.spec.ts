import { strict } from "node:assert";
import { afterEach, describe, expect, it } from "vitest";
import type { EmpresaCreateDto } from "../../../../../src/domain/schemas/empresa.schema";
import { EmpresaUseCaseCreate } from "../../../../../src/domain/usecases/empresa.usecase.create";
import { VoidError, type VoidErrorType } from "../../../../../src/error";
import { EmpresaRepositoryMock } from "../../../../mock/domain/repositories/empresa.repository.mock";

describe("Create empresa use case", () => {
	const empresaRepo = new EmpresaRepositoryMock();
	const usecase = new EmpresaUseCaseCreate(empresaRepo);

	afterEach(() => {
		empresaRepo.empresas = [];
	});

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

	it("should not create an empresa: Cnpj already used", async () => {
		const duplicatedCnpj = "empresa_cnpj";
		empresaRepo.empresas.push({
			cnpj: duplicatedCnpj,
			email: "empresa_email",
			nome: "empresa_nome",
			telefone: "empresa_phone",
		});

		const dto: EmpresaCreateDto = {
			cnpj: duplicatedCnpj,
			email: "teste@teste.com",
			nome: "Empresa Teste",
			telefone: "1234567890",
		};

		try {
			await usecase.execute(dto);
		} catch (error) {
			strict(error instanceof VoidError);
			expect(error.category).toBe<VoidErrorType>("ENTRY_COLLISION");
			expect(error.message).toBe("CNPJ ja foi usado por outra empresa");
		}
	});
});
