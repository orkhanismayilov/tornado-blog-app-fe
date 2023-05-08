import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from 'src/environments/environment';

import { authGuard } from '../guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [authGuard], title: `Login - ${environment.appName}` },
  { path: 'signup', component: SignupComponent, canActivate: [authGuard], title: `Sign Up - ${environment.appName}` },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
