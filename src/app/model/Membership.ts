import { Child } from "./child.model"

export class Membership
{
    [key: string]: any; 

    public id : any
    public serviceType : any
    public amount: any
    public paid: any
    public date: any
    public paymentDate: any
    public child: Child

    constructor()
    {
        this.child=new Child();
    }

}