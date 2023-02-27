import { HomeComponent } from './home/home.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { TranslatePageComponent } from './translate-page/translate-page.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full' , redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'translate', component: TranslatePageComponent},
  {path: 'quiz', component: QuizPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
