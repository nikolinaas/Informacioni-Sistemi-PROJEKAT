export class Group {
  constructor(
    private _id?: number,
    private _name?: string,
    private _numberOfMembers?: number
  ) {}

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get numberOfMembers() {
    return this._numberOfMembers;
  }
}
