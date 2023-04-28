export class ArrivalAndDepartureTime {
  constructor(private _recordedTime?: string, private _type?: boolean) {}

  get recordedTime() {
    return this._recordedTime;
  }

  get type() {
    return this._type;
  }
}
