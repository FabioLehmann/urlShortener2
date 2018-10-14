import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinksComponent }           from './links/links.component';
import { RedirectLinkComponent }           from './redirect-link/redirect-link.component';



const routes: Routes = [
	{ path: '', component: LinksComponent },
	{ path: ':id', component: RedirectLinkComponent },
	{ path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}