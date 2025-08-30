const DEMO_ERROR_CATEGORIES = [
  "ENTRY_COLLISION",
  "ENTRY_NOT_FOUND",
  "INFRASTRUCTURE_FAILURE",
] as const;

export type DemoErrorCategory = (typeof DEMO_ERROR_CATEGORIES)[number];

export class DemoError extends Error {
  constructor(
    public readonly category: DemoErrorCategory,
    message: string,
  ) {
    super(message);
  }
}
