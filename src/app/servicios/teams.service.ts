import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InInstitucion } from '../Interface/InInstitucion';
import { InLogo } from '../Interface/InLogo';
import { InTeams } from '../Interface/InTeams';

@Injectable({
    providedIn: 'root'
})
export class TeamsService{

    constructor(private http:HttpClient){}

    getTeams(){
        return this.http.get<InTeams[]>(`http://127.0.0.1:8000/api/teams`);
    }
    postTeams(form:InTeams){
        let params = new FormData();
        params.append('name',form.name);
        params.append('logo',form.logo);
        params.append('id_institution',form.id_institution.toString());
        return this.http.post(`http://127.0.0.1:8000/api/teams`,params);

    }
    deleteTeams(id:number){
        return this.http.delete(`http://127.0.0.1:8000/api/teams/${id}`);
    }
    showTeams(id:number){
        return this.http.get<InTeams>(`http://127.0.0.1:8000/api/teams/${id}`);
    }
    updateLogoTeams(id:number,file:InLogo){
        let params = new FormData();
        params.append('logo',file.logo);
        return this.http.post(`http://127.0.0.1:8000/api/updateLogoTeams/${id}`,params);
    }

    updateTeams(id:number, form:InTeams){
        let params = new HttpParams()
        .set('name', form.name)
        .set('id_institution', form.id_institution)
        return this.http.put(`http://127.0.0.1:8000/api/teams/${id}`,params);
    }
}