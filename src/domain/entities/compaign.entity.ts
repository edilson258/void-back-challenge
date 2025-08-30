export class CompaignEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly companyId: string,
    public readonly startedAt: Date,
    public readonly finishedAt: Date,
  ) {}
}
