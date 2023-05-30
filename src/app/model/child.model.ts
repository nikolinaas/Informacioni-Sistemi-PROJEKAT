import { ArrivalAndDepartureTime } from './arrivalAndDepartureTime.model';
import { Address } from './address.model';
import { Note } from './note.model';

export class Child {
  constructor(
    private _id?: number,
    private _name?: string,
    private _uid?: string,
    private _dateOfBirth?: string,
    private _address?: Address,
    private _motherName?: string,
    private _fatherPhoneNumber?: string,
    private _motherPhoneNumber?: string,
    private _height?: string,
    private _weight?: string,
    private _idGroup?: string,
    private _surname?: string,
    private _note?: Note,
    private _isHere?: boolean,
    private _fatherName?: string,
    private _arrivalAndDepartureTime?: ArrivalAndDepartureTime,
  ){
    
  }

  get note() {
    return this._note;
  }
  set note(note: Note | undefined) {
    this._note=note;
  }

  get idGroup() {
    return this._idGroup;
  }
  set idGroup(idGroup: string | undefined) {
    this._idGroup=idGroup;
  }

  get weight() {
    return this._weight;
  }
  set weight(weight: string | undefined) {
    this._weight=weight;
  }

  get height() {
    return this._height;
  }
  set height(height: string | undefined) {
    this._height=height;
  }

  get motherPhoneNumber() {
    return this._motherPhoneNumber;
  }
  set motherPhoneNumber(motherPhoneNumber: string | undefined){
    this._motherPhoneNumber=motherPhoneNumber;
  }

  get fatherPhoneNumber() {
    return this._fatherPhoneNumber;
  }
  set fatherPhoneNumber(fatherPhoneNumber: string | undefined){
    this._fatherPhoneNumber=fatherPhoneNumber;
  }

  get motherName() {
    return this._motherName;
  }
  set motherName(motherName: string | undefined){
    this._motherName=motherName;
  }

  get address() {
    return this._address;
  }
  set address(address: Address | undefined){
    this._address=address;
  }

  get dateOfBirth() {
    return this._dateOfBirth;
  }
  set dateOfBirthdateOfBirth(dateOfBirth: string | undefined){
    this._dateOfBirth=dateOfBirth;
  }

  get uid() {
    return this._uid;
  }
  set uid(uid: string | undefined){
    this._uid=uid;
  }

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
