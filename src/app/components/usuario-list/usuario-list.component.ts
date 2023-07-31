import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioDataService } from 'src/app/services/usuario.data.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss'],
})
export class UsuarioListComponent implements OnInit {
  public usuarios: UsuarioModel[] = null;

  constructor(
    private navCtrl: NavController,
    private service: UsuarioDataService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.load("");
  }

  load(nome: string) {
    if (nome == "") {
      this.service.getUsuarios().subscribe(
        (res: any) => {
          this.usuarios = res;
        },
        (err) => {
          console.log(err.mensagem);
          this.showError('Problemas ao consultar usuários');
        }
      );
    }
    else {
      this.service.getUsuarioByNome(nome).subscribe(
        (res: any) => {
          this.usuarios = res;
        },
        (err) => {
          console.log(err.mensagem);
          this.showError('Problemas ao consultar usuários');
        }
      );
    }
  }

  async showError(message: string) {
    const error = await this.toastCtrl.create({ message: message, duration: 2000 });
    error.present();
  }

  goToUsuario(id) {
    this.navCtrl.navigateForward(`/usuario/${id}`);
    UsuarioDataService.alterouUsuario.subscribe(
      (res: any) => {
        this.load("");
      }
    );
  }

  novo() {
    this.navCtrl.navigateForward('/usuario/new');
    UsuarioDataService.alterouUsuario.subscribe(
      (res: any) => {
        this.load("");
      }
    );
  }

  async ionInput(event: any) {
    const term = event.srcElement.value;
    this.load(term);  
  }
}
