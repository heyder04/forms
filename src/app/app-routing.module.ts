import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MoreComponent } from './more/more.component';

const routes: Routes = [
  {path:'forms/ss/ff',component:AppComponent},
   {path:'forms/:id2/ff2',component:MoreComponent},
  {path:'',redirectTo:'forms/ss/ff',pathMatch:'full'},
  {path:'admin',loadChildren:()=>import('./modules/admin/admin.module').then(x=>x.AdminModule)},
  {path:'user',loadChildren:()=>import('./modules/user/user.module').then(x=>x.UserModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
