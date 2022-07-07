import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { InTypesPersons } from '../Interface/InTypesPersons';

@Injectable({
  providedIn: 'root'
})
export class TypesPersonsService {
  @Output() typePerson = new EventEmitter<InTypesPersons>();
  @Output() isUpdate = new EventEmitter<boolean>();

  constructor(private http:HttpClient) { }

  postTypesPersons(form:InTypesPersons){
    let params = new HttpParams()
    .set('type_person',form.type_person)
    return this.http.post(`http://127.0.0.1:8000/api/types_persons`,params);
  }
  getTypesPersons(){
    return this.http.get<InTypesPersons[]>(`http://127.0.0.1:8000/api/types_persons`);
  }
  deleteTypesPersons(id:number){
    return this.http.delete(`http://127.0.0.1:8000/api/types_persons/${id}`);
  }
  showTypesPersons(id:number){
    return this.http.get<InTypesPersons>(`http://127.0.0.1:8000/api/types_persons/${id}`);
  }
  updateTypesPersons(id:number,form:InTypesPersons){
    let params = new HttpParams()
    .set('type_person',form.type_person)
    return this.http.put(`http://127.0.0.1:8000/api/types_persons/${id}`,params);
  }
}
