import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteDetailComponent } from './components/note-detail/note-detail.component';
import { NotesComponent } from './components/notes/notes.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: NotesComponent, title: 'Notes', },
  { path: ':id', component: NoteDetailComponent },
  { path: 'redirect', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, title: 'Not Found', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
