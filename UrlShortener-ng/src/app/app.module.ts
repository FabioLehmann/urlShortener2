import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LinkInputComponent } from './link-input/link-input.component';
import { LinksTableComponent } from './links-table/links-table.component';
import { LinksComponent } from './links/links.component';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RedirectLinkComponent } from './redirect-link/redirect-link.component';


@NgModule({
  declarations: [
    AppComponent,
    LinksComponent,
    LinkInputComponent,
    LinksTableComponent,
    RedirectLinkComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
	HttpClientModule,
	AppRoutingModule
  ],
  providers: [
    // no need to place any providers due to the `providedIn` flag...
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }