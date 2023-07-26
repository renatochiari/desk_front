export class UsuarioModel {
    constructor(
        public id: string,
        public documento: string,
        public nome: string,
        public rua: string,
        public numero: string,
        public complemento: string,
        public bairro: string,
        public cep: string,
        public cidade: string,
        public estado: string,
        public email: string,
        public senha: string,
        public regra: string,
        public empresaId: string,
        public clienteId: string,
        public token: string
    ) {

    }
}