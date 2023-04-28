export class Address {
  constructor(
    private _city?: string,
    private _number?: number,
    private _street?: string
  ) {}

  get city() {
    return this._city;
  }

  get number() {
    return this._number;
  }

  get street() {
    return this._street;
  }

  set city(city: string | undefined) {
    this._city = city;
  }

  set number(number: number | undefined) {
    this._number = number;
  }

  set street(street: string | undefined) {
    this._street = street;
  }
}
