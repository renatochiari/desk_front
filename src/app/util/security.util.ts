import { UsuarioModel } from '../models/usuario.model';

export class SecurityUtil {
    public static set(usuario: UsuarioModel) {
        const data = JSON.stringify(usuario);
        localStorage.setItem('desk.data', btoa(data));
    }

    public static get(): UsuarioModel {
        const data = localStorage.getItem('desk.data');
        if (data) {
            return JSON.parse(atob(data));
        } else {
            return null;
        }
    }

    public static temToken(): boolean {
        const usuario = this.get();

        if (usuario && usuario.token)
            return true;
        else
            return false;
    }

    public static estaNaRegra(regra: string): boolean {
        const usuario = this.get();

        if (!usuario)
            return false;

        if (!usuario.regra || usuario.regra == '')
            return false;

        return usuario.regra == regra;
    }

    public static clear() {
        localStorage.removeItem('desk.data');
    }
}