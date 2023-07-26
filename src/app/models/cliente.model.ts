export class ClienteModel {
    constructor(
        public id: string = "",
        public documento: string = "",
        public nome: string = "",
        public rua: string = "",
        public numero: string = "",
        public complemento: string = "",
        public bairro: string = "",
        public cep: string = "",
        public cidade: string = "",
        public estado: string = "",
        public email: string = "",
        public empresaId: string = ""
    ) {

    }
}