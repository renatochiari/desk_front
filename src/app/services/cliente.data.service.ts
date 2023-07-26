import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { Options } from "selenium-webdriver";
import { UsuarioModel } from "../models/usuario.model";
import { SecurityUtil } from "../util/security.util";
import { UsuarioDataService } from "./usuario.data.service";

@Injectable({
    providedIn: 'root'
})
export class ClienteDataService {

    static alterouCliente = new EventEmitter<boolean>();

    public baseUrl = "http://localhost:5300";

    constructor(private http: HttpClient) { }

    public getClientes() {
        return this.http.get(`${this.baseUrl}/v1/clientes`, UsuarioDataService.getHeaders());
    }

    public getClienteById(id: string) {
        return this.http.get(`${this.baseUrl}/v1/clientes/${id}`, UsuarioDataService.getHeaders());
    }

    public getClientesByNome(nome: string) {
        return this.http.get(`${this.baseUrl}/v1/clientes/nome/${nome}`, UsuarioDataService.getHeaders());
    }

    public insertCliente(data: any) {
        return this.http.post(`${this.baseUrl}/v1/clientes`, data, UsuarioDataService.getHeaders());
    }

    public updateCliente(data: any) {
        return this.http.put(`${this.baseUrl}/v1/clientes`, data, UsuarioDataService.getHeaders());
    }
}