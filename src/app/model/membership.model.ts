import { Child } from "./child.model";

export class Membership {
  constructor(
    private _id: number,
    private _serviceType: boolean,
    private _amount: number,
    private _paid: boolean,
    private _date: string,
    private _paymentDate: string,
    private _child: Child
  ) {}

  get id() {
    return this._id;
  }

  get serviceType() {
    return this._serviceType;
  }

  get amount() {
    return this._amount;
  }

  get paid() {
    return this._paid;
  }

  get date() {
    return this._date;
  }

  get paymentDate() {
    return this._paymentDate;
  }

  get child() {
    return this._child;
  }
}
