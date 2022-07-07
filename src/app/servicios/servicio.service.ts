import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

 
  constructor(private http:HttpClient) { }

  login(username:string, password:string){
    let params = new  HttpParams()
    .set('name',username)
    .set('password',password);
   return   this.http.post<any>("http://127.0.0.1:8000/api/users/login",params);
  }

  getUsers(){
    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return   this.http.get<any>("http://127.0.0.1:8000/api/users", {headers: header});
  }
 
  UserDelete(id:number){

    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    
    let params = new  HttpParams()
    .set('id',id)

    return this.http.put<any>("http://127.0.0.1:8000/api/user/d", params,{headers: header});
 
  }
  getUser(id:number){
    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    
    let params = new  HttpParams()
    .set('id',id)

    return this.http.put<any>(`http://127.0.0.1:8000/api/user`, params,{headers: header});   
  }

  editUser(id:number){
    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    let params = new  HttpParams()
    .set('id',id)

    return this.http.put("http://127.0.0.1:8000/api/editUser",params,{headers: header});
  }
  traertypes(){
    return   this.http.get("http://127.0.0.1:8000/api/types_users");
  }
  register(name:string, password:string, email:string,typeUser_id:number ){
    let params=new HttpParams()
    .set('name',name)
    .set('password',password)
    .set('email',email)
    .set('typeUser_id',typeUser_id)
    return this.http.post<any>("http://127.0.0.1:8000/api/users",params)
  }
}
