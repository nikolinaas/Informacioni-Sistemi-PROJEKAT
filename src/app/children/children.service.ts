import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Child } from '../model/Child';


export class ChildrenService  {
    //constructor(private http: HttpClient){   }
    
    getAll(): string[] {
        //return this.http.get<Child[]>('http://localhost:8080/Server/api/children');
        return ["podatak1", "podatak2", "podatak3"];
    }
}