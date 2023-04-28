import { Address } from "./address.model";

export class Kindergarten {
  constructor(
    private _name?: string,
    private _phoneNumber?: string,
    private _address?: Address
  ) {}

  get name() {
    return this._name;
  }

  get phoneNumber() {
    return this._phoneNumber;
  }

  get address() {
    return this._address;
  }

  set name(name: string | undefined) {
    this._name = name;
  }

  set phoneNumber(phoneNumber: string | undefined) {
    this._phoneNumber = phoneNumber;
  }

  set address(address: Address | undefined) {
    this._address = address;
  }

}
