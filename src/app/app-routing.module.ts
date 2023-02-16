import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuideComponent } from './guide/guide.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: "form", component: UserComponent },
  { path: "guide", component: GuideComponent },
  { path: "", redirectTo: "guide", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
