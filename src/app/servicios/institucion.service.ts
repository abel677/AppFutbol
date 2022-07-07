import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InInstitucion } from '../Interface/InInstitucion';
import { InLogo } from '../Interface/InLogo';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {


  constructor(private http: HttpClient) { }

  registerInstitucion(form: InInstitucion) {
    let params = new FormData();
    params.append("name", form.name);
    params.append("president", form.president);
    params.append("logo", form.logo);
    return this.http.post<any>("http://127.0.0.1:8000/api/institutions", params);
  }

  getInstitucion() {
    return this.http.get<InInstitucion[]>("http://127.0.0.1:8000/api/institutions");
  }

  showInstitucion(id: number) {
    return this.http.get<InInstitucion>(`http://127.0.0.1:8000/api/institutions/${id}`)
  }

  updateInstitucion(id: number, form: InInstitucion) {
    let params = new HttpParams()
      .set("name", form.name)
      .set("president", form.president)
    return this.http.put<any>(`http://127.0.0.1:8000/api/institutions/${id}`, params);
  }

  deleteInstitucion(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/institutions/${id}`)
  }
  updateLogoIntitutions(id:number, image:InLogo){
    
    let params = new FormData();
    params.append('logo',image.logo);
    
    return this.http.post(`http://127.0.0.1:8000/api/updateLogoInstitutions/${id}`,params);
  }
}
