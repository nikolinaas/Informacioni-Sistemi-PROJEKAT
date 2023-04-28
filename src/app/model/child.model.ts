import { ArrivalAndDepartureTime } from './arrivalAndDepartureTime.model';
export class Child {
  constructor(
    private _id?: number,
    private _name?: string,
    private _surname?: string,
    private _isHere?: boolean,
    private _fatherName?: string,
    private _arrivalAndDepartureTime?: ArrivalAndDepartureTime,
  ){}

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get surname() {
    return this._surname;
  }

  get isHere() {
    return this._isHere;
  }

  get fatherName() {
    return this._fatherName;
  }

  set isHere(isHere: boolean | undefined){
    this._isHere = isHere;
  }

  get arrivalAndDepartureTime() {
    return this._arrivalAndDepartureTime;
  }

}
