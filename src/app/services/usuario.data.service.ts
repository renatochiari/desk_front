import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { Options } from "selenium-webdriver";
import { UsuarioModel } from "../models/usuario.model";
import { SecurityUtil } from "../util/security.util";

@Injectable({
    providedIn: 'root'
})
export class UsuarioDataService {

    public baseUrl = "http://localhost:5300";

    constructor(private http: HttpClient) { }

    public login(data: any) {
        return this.http.post(`${this.baseUrl}/v1/usuarios/login`, data);
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