import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../model/Group';


export class GroupsService  {
    //constructor(private http: HttpClient){   }
    
    getAll(): string[] {
        //return this.http.get<Child[]>('http://localhost:8080/Server/api/group'); //provjeriti oovo
        return ["podatak1", "podatak2", "podatak3"];
    }
}