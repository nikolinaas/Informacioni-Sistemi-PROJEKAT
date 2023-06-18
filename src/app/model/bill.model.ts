export class Bill {
  constructor(
    private _amount: number,
    private _billNumber: string,
    private _billType: string,
    private _date: string,
    private _paid: boolean
  ) {}

  get amount() {
    return this._amount;
  }

  get billNumber() {
    return this._billNumber;
  }

  get billType() {
    return this._billType;
  }

  get date() {
    return this._date;
  }

  get paid() {
    return this._paid;
  }
}
