import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from './guards/authorized.guard';
import { FramePage } from './pages/frame/frame.page';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/account/login/login.module').then(m => m.LoginPageModule) },
  {
    path: '',
    component: FramePage,
    canActivate: [AuthorizedGuard],
    children: [
      { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
      { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
      { path: 'cliente', loadChildren: () => import('./pages/cliente/cliente.module').then(m => m.ClientePageModule) },
      { path: 'cliente/:id', loadChildren: () => import('./pages/cliente-detalhe/cliente-detalhe.module').then(m => m.ClienteDetalhePageModule) },
      { path: 'usuario', loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioPageModule) }
    ]
  }  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
