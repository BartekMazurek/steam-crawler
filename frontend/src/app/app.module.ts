import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { MessagebarComponent } from './messagebar/messagebar.component';
import { LoaderComponent } from './loader/loader.component';
import { GamelistComponent } from './gamelist/gamelist.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    SearchbarComponent,
    MessagebarComponent,
    LoaderComponent,
    GamelistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
