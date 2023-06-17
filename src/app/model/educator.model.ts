import { DatePipe } from "@angular/common";
import { Address } from "./address.model";

export class Educator{
 
    constructor(
        private _id?: number,
        private _name?: string,
        private _surname?: string,
        private _dateOfBirth?: DatePipe,
        private _uid?: string,
        private _address?: Address,
        private _username?: string,
        private _password?: string,
        private _phoneNumber?: string
      ){}
      
    get name() {
        return this._name;
    }

    set name(name: string | undefined) {
        this._name = name;
    }

    get surname() {
        return this._surname;
    }

    set surname(surname: string | undefined) {
        this._surname = surname;
    }

    get dateOfBirth() {
        return this._dateOfBirth;
    }

    set dateOfBirth(dateOfBirth: DatePipe | undefined) {
        this._dateOfBirth = dateOfBirth;
    }

    get uid() {
        return this._uid;
    }

    set uid(uid: string | undefined) {
        this._uid = uid;
    }

    get address() {
        return this._address;
    }

    set address(address: Address | undefined) {
        this._address = address;
    }

    get password() {
        return this._password;
    }

    set password(password: string | undefined) {
        this._password = password;
    }

    get username() {
        return this._username;
    }

    set username(username: string | undefined) {
        this._username = username;
    }

    get id() {
        return this._id;
      }
    
    set id(id: number | undefined){
        this._id = id;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }

    set phoneNumber(phoneNumber: string | undefined) {
        this._phoneNumber = phoneNumber;
    }


      



}