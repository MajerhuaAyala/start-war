export class Optional<T> {
  private readonly value: T | undefined;

  constructor(value?: T | null | undefined) {
    if (value === null || value === undefined) {
      this.value = undefined;
    } else {
      this.value = value;
    }
  }

  isPresent(): boolean {
    return this.value !== undefined;
  }

  get(): T {
    if (!this.isPresent()) {
      throw new Error("Value is not present");
    }
    return this.value as T;
  }

  orElse(defaultValue: T): T {
    return this.isPresent() ? this.get() : defaultValue;
  }

  orElseGet(provider: () => T): T {
    return this.isPresent() ? this.get() : provider();
  }

  orElseThrow(errorProvider: () => Error): T {
    if (!this.isPresent()) {
      throw errorProvider();
    }
    return this.get();
  }

  map<U>(mapper: (value: T) => U): Optional<U> {
    return this.isPresent()
      ? new Optional<U>(mapper(this.get()))
      : new Optional<U>();
  }

  filter(predicate: (value: T) => boolean): Optional<T> {
    if (!this.isPresent() || !predicate(this.get())) {
      return new Optional<T>();
    }
    return this;
  }

  flatMap<U>(mapper: (value: T) => Optional<U>): Optional<U> {
    if (!this.isPresent()) {
      return new Optional<U>();
    }
    return mapper(this.get());
  }

  static empty<T>(): Optional<T> {
    return new Optional<T>();
  }

  static of<T>(value: T): Optional<T> {
    if (value === undefined || value === null) {
      throw new Error("Value cannot be null or undefined");
    }
    return new Optional<T>(value);
  }

  static ofNullable<T>(value: T | null | undefined): Optional<T> {
    return new Optional<T>(value);
  }
}
