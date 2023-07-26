import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ClienteModel } from 'src/app/models/cliente.model';
import { ClienteDataService } from 'src/app/services/cliente.data.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss'],
})
export class ClienteListComponent implements OnInit {
  public clientes: ClienteModel[] = null;

  constructor(
    private navCtrl: NavController,
    private service: ClienteDataService,
    private toastCrl: ToastController
  ) {

  }

  ngOnInit() {
    this.load("");
  }

  load(nome: string) {
    if (nome == "") {
      this.service.getClientes().subscribe(
        (res: any) => {
          this.clientes = res;
        },
        (err) => {
          console.log(err.mensagem);
          this.showError('Problemas ao consultar clientes');
        }
      );
    }
    else {
      this.service.getClientesByNome(nome).subscribe(
        (res: any) => {
          this.clientes = res;
        },
        (err) => {
          console.log(err.mensagem);
          this.showError('Problemas ao consultar clientes');
        }
      );
    }
  }

  async showError(message: string) {
    const error = await this.toastCrl.create({ message: message, duration: 2000 });
    error.present();
  }

  goToCliente(id) {
    this.navCtrl.navigateForward(`/cliente/${id}`);
    ClienteDataService.alterouCliente.subscribe(
      (res: any) => {
        this.load("");
      }
    );
  }

  novo() {
    this.navCtrl.navigateForward('/cliente/new');
    ClienteDataService.alterouCliente.subscribe(
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
