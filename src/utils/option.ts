export class Option<T> {
  private value: T | null;

  private constructor(value?: T) {
    this.value = value ?? null;
  }

  public static some = <T>(value: T): Option<T> => new Option(value);
  public static none = <T>(): Option<T> => new Option();
  public static fromNullable = <T>(value: T | null | undefined): Option<T> =>
    value === null || value === undefined ? Option.none() : Option.some(value);

  public isSome = (): boolean => this.value !== null;
  public isNone = (): boolean => this.value === null;

  public unwrap(): T {
    if (this.isNone()) {
      throw new Error("unwrap called on None");
    }
    return this.value!;
  }
}
