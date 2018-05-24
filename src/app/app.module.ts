import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainPlayerComponent } from './main-player/main-player.component';
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { PlaylistComponent } from './playlist/playlist.component';

const appRoutes: Routes = [
	{ path: '', redirectTo: '/player', pathMatch: 'full' },
	{ path: 'player', component: MainPlayerComponent, data: { state : 'player' } },
  { path: 'playlist', component: PlaylistComponent, data: { state : 'playlist' } }
];

@NgModule({
  declarations: [
    AppComponent,
    MainPlayerComponent,
    NowPlayingComponent,
    PlaylistComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
