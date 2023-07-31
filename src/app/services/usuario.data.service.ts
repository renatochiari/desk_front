import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { Options } from "selenium-webdriver";
import { UsuarioModel } from "../models/usuario.model";
import { SecurityUtil } from "../util/security.util";

@Injectable({
    providedIn: 'root'
})
export class UsuarioDataService {

    static alterouUsuario = new EventEmitter<boolean>();

    public baseUrl = "http://localhost:5300";

    constructor(private http: HttpClient) { }

    public login(data: any) {
        return this.http.post(`${this.baseUrl}/v1/usuarios/login`, data);
    }

    public getUsuarios() {
        return this.http.get(`${this.baseUrl}/v1/usuarios`, UsuarioDataService.getHeaders());
    }

    public getUsuarioById(id: string) {
        return this.http.get(`${this.baseUrl}/v1/usuarios/${id}`, UsuarioDataService.getHeaders());
    }

    public getUsuarioByNome(nome: string) {
        return this.http.get(`${this.baseUrl}/v1/usuarios/nome/${nome}`, UsuarioDataService.getHeaders());
    }

    public insertUsuario(data: any) {
        return this.http.post(`${this.baseUrl}/v1/usuarios`, data, UsuarioDataService.getHeaders());
    }

    public updateUsuario(data: any) {
        return this.http.put(`${this.baseUrl}/v1/usuarios`, data, UsuarioDataService.getHeaders());
    }

    static getHeaders(): object {
        let usuario: UsuarioModel = SecurityUtil.get();
        return {
            headers: new HttpHeaders(
                {
                    Authorization: "Bearer " + usuario.token,
                    "Access-Control-Allow-Origin": "*"
                }
            )
        };
    }
}