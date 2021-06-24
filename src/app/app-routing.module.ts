import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MusicListComponent} from './music-list/music-list.component';
import {MusicDetailsComponent} from './components/music-details/music-details.component';

const routes: Routes = [
  {path: '', redirectTo: '/search', pathMatch: 'full'},
  {path: 'search', component: MusicListComponent},
  {path: 'details/:id', component: MusicDetailsComponent},
  {path: '**', component: MusicListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
