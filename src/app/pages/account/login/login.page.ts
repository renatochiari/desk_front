import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { UsuarioDataService } from 'src/app/services/usuario.data.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { SecurityUtil } from 'src/app/util/security.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public hide: boolean = true;
  public form: FormGroup;
  private usuario: UsuarioModel;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCrl: ToastController,
    private navCtrl: NavController,
    private service: UsuarioDataService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      senha: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])]
    });
  }

  async submit() {
    if (this.form.invalid)
      return;

    const loading = await this.loadingCtrl.create({ message: "Autenticando..." });
    loading.present();

    this.service.login(this.form.value).subscribe(
      (res: any) => {
        if (!res.sucesso) {
          this.showError(res.mensagem);
          loading.dismiss();
          return;
        }

        this.usuario = res.dados.usuario;
        this.usuario.token = res.dados.token;
        SecurityUtil.set(this.usuario);
        loading.dismiss();
        this.navCtrl.navigateRoot('/');
      },
      (err) => {
        this.showError('Problemas ao realizar o login');
        loading.dismiss();
      }
    );
  }

  async resetPassword() {
    this.showError("Função ainda não implementada");
  }

  ngOnInit() {
  }

  toggleHide() {
    this.hide = !this.hide;
  }

  async showError(message) {
    const error = await this.toastCrl.create({ message: message, duration: 2000 });
    error.present();
  }

}
