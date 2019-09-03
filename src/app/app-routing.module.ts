import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddImageComponent} from "./Image/add-image/add-image.component";
import {ListImageComponent} from "./Image/list-image/list-image.component";
import {UpdateImageComponent} from "./Image/update-image/update-image.component";
import {DeleteImageComponent} from "./Image/delete-image/delete-image.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuardGuard} from "./auth/auth-guard.guard";


const routes: Routes = [
  {path: 'addimage', component: AddImageComponent, canActivate: [AuthGuardGuard]},
  {path: 'listimage', component: ListImageComponent, canActivate: [AuthGuardGuard]},
  {path: 'editimage', component: UpdateImageComponent, canActivate: [AuthGuardGuard]},
  {path: 'deleteimage', component: DeleteImageComponent, canActivate: [AuthGuardGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
