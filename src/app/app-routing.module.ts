import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router'
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroeComponent } from './pages/heroe/heroe.component';

const routes: Routes = [
  {path:'heroes', component: HeroesComponent},
  {path:'heroe/:id', component: HeroeComponent},
  {path:'**', pathMatch:'full', redirectTo:'heroes'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  // Debo colocar el exports para que quede de manera global
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
