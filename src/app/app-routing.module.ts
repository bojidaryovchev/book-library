import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'library',
    loadChildren: () => import('./modules/book-library/book-library.module').then((m) => m.BookLibraryModule),
  },
  {
    path: '**',
    redirectTo: 'library',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
