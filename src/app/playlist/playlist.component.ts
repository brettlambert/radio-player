import { Component, OnInit } from '@angular/core';

import { NowPlayingService } from '../_services/now-playing.service';

import { Track } from '../_models/track.model';

@Component({
	selector: 'app-playlist',
	templateUrl: './playlist.component.html',
	styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

	tracks: Track[] = [];

	tracksLoading: boolean = false;

	constructor(private npService: NowPlayingService) { }

	/**
	 * Sets the tracks.
	 *
	 * @return     void
	 */
	setTracks(): void{
		//Clone npService's recentlyPlayed array and then reverse newly created one
		this.tracks = Object.assign([], this.npService.recentlyPlayed).reverse();
	}
	
	ngOnInit() {

		//Set tracksLoading variable
		this.tracksLoading = true;

		//If iTunes formatting enabled, format all tracks
		if(this.npService.shouldFormatTracks() && this.npService.recentlyPlayed.length){
			//Set tracks
			this.setTracks();
		}

		//Watch npService npUpdate event
		this.npService.npUpdate.subscribe((updated) => {
			this.setTracks();
		});

		//Set tracksLoading to false
		this.tracksLoading = false;
	}

}
