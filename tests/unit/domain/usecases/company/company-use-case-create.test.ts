import { expect, describe, it, beforeEach } from "vitest";

import { CompanyUseCaseCreate } from "../../../../../src/domain/usecases/company/create";
import { CompanyRepositoryMock } from "../../../../mock/domain/repositories/company-repository.mock";

import type { CompanyDtoCreate } from "../../../../../src/domain/schemas/company-schemas";
import type { DemoErrorCategory } from "../../../../../src/error";

describe("Create Company Use Case", () => {
  const companyRepositoryMock = new CompanyRepositoryMock();
  const companyUseCase = new CompanyUseCaseCreate(companyRepositoryMock);

  beforeEach(() => companyRepositoryMock.reset());

  it("should create a company", async () => {
    const dto: CompanyDtoCreate = {
      name: "Test Company",
      cnpj: "12345678901234",
      email: "test@example.com",
      phone: "1234567890",
    };

    const company = await companyUseCase.execute(dto);

    expect(company.isOk()).toBe(true);

    expect(company).toBeDefined();
    expect(company.unwrap().id).toBeDefined();
    expect(company.unwrap().name).toBe("Test Company");
    expect(company.unwrap().email).toBe("test@example.com");
    expect(company.unwrap().phone).toBe("1234567890");
  });

  it("should not create a company due to duplicated cnpj", async () => {
    const dto1: CompanyDtoCreate = {
      name: "Test Company",
      cnpj: "12345678901234",
      email: "test@example.com",
      phone: "1234567890",
    };

    const dto2: CompanyDtoCreate = {
      name: "Test Company 2",
      cnpj: dto1.cnpj,
      email: "test2@example.com",
      phone: "1234567891",
    };

    await companyUseCase.execute(dto1);
    const company2 = await companyUseCase.execute(dto2);

    expect(company2.isErr()).toBe(true);

    expect(company2.unwrapErr().category).toBe<DemoErrorCategory>(
      "ENTRY_COLLISION",
    );
  });
});
