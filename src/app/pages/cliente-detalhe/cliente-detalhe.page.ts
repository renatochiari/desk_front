import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ClienteModel } from 'src/app/models/cliente.model';
import { ClienteDataService } from 'src/app/services/cliente.data.service';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.page.html',
  styleUrls: ['./cliente-detalhe.page.scss'],
})
export class ClienteDetalhePage implements OnInit {
  public cliente: ClienteModel = null;
  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private service: ClienteDataService,
    private toastCrl: ToastController,
    private navCtrl: NavController,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      documento: [],
      nome: [],
      rua: [],
      numero: [],
      complemento: [],
      bairro: [],
      cep: [],
      cidade: [],
      estado: [],
      email: []
    });
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') == "new")
      this.cliente = new ClienteModel();
    else
      this.carregarCliente(this.route.snapshot.paramMap.get('id'));
  }

  async showError(message: string) {
    const error = await this.toastCrl.create({ message: message, duration: 2000 });
    error.present();
  }

  async carregarCliente(id: string) {
    this.service.getClienteById(id).subscribe(
      (res: any) => {
        this.cliente = res;
      },
      (err) => {
        console.log(err.mensagem);
        this.showError('Problemas ao consultar o cliente');
      }
    );
  }

  async salvar() {
    if (this.form.invalid)
      return;

    if (this.cliente.id) {
      this.service.updateCliente(this.cliente).subscribe(
        (res: any) => {
          if (!res.sucesso) {
            this.showError(res.mensagem);
            return;
          }

          ClienteDataService.alterouCliente.emit(true);
          this.navCtrl.navigateBack('/cliente');
        },
        (err) => {
          console.log(err.mensagem);
          this.showError("Problemas ao salvar o cadastro");
        }
      )
    }
    else {
      this.service.insertCliente(this.cliente).subscribe(
        (res: any) => {
          if (!res.sucesso) {
            this.showError(res.mensagem);
            return;
          }

          ClienteDataService.alterouCliente.emit(true);
          this.navCtrl.navigateBack('/cliente');
        },
        (err) => {
          console.log(err.mensagem);
          this.showError("Problemas ao salvar o cadastro");
        }
      )
    }
  }

  cancelar() {
    this.navCtrl.navigateBack('/cliente');
  }

}
