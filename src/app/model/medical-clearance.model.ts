export class MedicalClearance {

    constructor(
        private _id?: number,
        private _idPerson?: number,
        private _file?: Uint8Array
    ){

    }

    get id(){
        return this._id;
    }
    set id(id: number | undefined){
        this._id=id;
    }

    get idPerson(){
        return this._idPerson;
    }
    set idPerson(idPerson: number | undefined){
        this._idPerson=idPerson;
    }

    get file(){
        return this._file;
    }
    set file(file: Uint8Array | undefined){
        this._file=file;
    }

}