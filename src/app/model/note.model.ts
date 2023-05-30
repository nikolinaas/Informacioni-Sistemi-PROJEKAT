export class Note {

    constructor(
        private _id?: number,
        private _idChild?: number,
        private _description?: string
    ){

    }

    get id(){
        return this._id;
    }
    set id(id:number | undefined) {
        this._id=id;
    }

    get idChild() {
        return this._idChild;
    }
    set idChild(idChild: number | undefined){
        this._idChild=idChild;
    }

    get description() {
        return this._description;
    }
    set description(description: string | undefined) {
        this._description=description;
    }
}