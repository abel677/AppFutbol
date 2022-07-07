import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InTypeuser } from '../Interface/InForm';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  register_types(form:InTypeuser) {
    let params = new HttpParams()
      .set('type_user', form.type_user)
    return this.http.post<any>("http://127.0.0.1:8000/api/types_users", params);
  }

  gettypes() {
    return this.http.get("http://127.0.0.1:8000/api/types_users");
  }
  
  showTypeUser(id:number){
    return this.http.get(`http://127.0.0.1:8000/api/types_users/${id}`);
  }
  
  useruptade(id:number, form:InTypeuser) {
    let params = new HttpParams()
      .set('type_user', form.type_user)
      .set('state', form.state)
    return this.http.put<any>(`http://127.0.0.1:8000/api/types_users/${id}`, params);
  }

  userdelete(id:number) {
    return this.http.delete(`http://127.0.0.1:8000/api/types_users/${id}`);
  }
  

}
