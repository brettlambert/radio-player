import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Howl } from 'howler';
import { NotificationsService } from '../_services/notifications.service';

@Injectable({
	providedIn: 'root'
})
export class StreamingService {

	player;

	status: string;

	@Output() played: EventEmitter<any> = new EventEmitter();

	@Output() error: EventEmitter<any> = new EventEmitter();

	constructor(private notifications: NotificationsService, private http: HttpClient) {
		//Init player
		this.play();
	}

	/**
	 * Generates sources array from PLS playlist file.
	 *
	 * @param      string  playlistURL  The playlist url
	 * @return     Array  Array of source urls
	 */
	private sourceFromPLS(playlistURL){

		let promise = new Promise((resolve, reject) => {
    		let sources = [];

    		this.http.get(playlistURL, { responseType: 'text' }).subscribe((res) => {

    			//Loop through each line
    			for(let line of res.split('\n')){

    				//If line is playlist "File" line, add the url from it to sources
    				if(line.match(/File[0-9]=/g)){
    					sources.push(line.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g).toString());
    				}

    			}

    			resolve(sources);
    		});

		});

  		return promise;
	}

	/**
	 * Generates sources array from M3U playlist file.
	 *
	 * @param      string  playlistURL  The playlist url
	 * @return     Array  Array of source urls
	 */
	private sourceFromM3U(playlistURL){

		let promise = new Promise((resolve, reject) => {
    		let sources = [];

    		this.http.get(playlistURL, { responseType: 'text' }).subscribe((res) => {

    			//Loop through each line
    			for(let line of res.split('\n')){

    				//if line is url, add it to sources
    				if(line.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)){
    					sources.push(line);
    				}

    			}

    			resolve(sources);
    		});

		});

  		return promise;
	}

	/**
	 * Gets the player source based on environment streaming url
	 *
	 * @return     Array  The player source.
	 */
	private getPlaySource(){

		let promise = new Promise((resolve, reject) => {
    		let sources: any = [];

    		let envSource = environment.streaming.url;

    		if(envSource.split('.').pop() == "pls"){
    			//Parse PLS files
    			sources = this.sourceFromPLS(envSource);
    		}else if(envSource.split('.').pop() == "m3u"){
    			//Parse M3U files
    			sources = this.sourceFromM3U(envSource);
    		}else{
    			//Standard source url
    			sources.push(envSource);
    		}

    		return resolve(sources);
		});

  		return promise;
	}


	/**
	 * Initalizes/loads player
	 *
	 * @return     Promise
	 */
	initPlayer(sources){

		this.player = new Howl({
			src: sources,
			format: environment.streaming.format,
			html5: environment.streaming.html5,
			autoplay: environment.streaming.autoplay,
			onload: () => {
				this.status = 'loaded';
			},
			onloaderror: () => {
				this.status = 'loaderror';

				this.notifications.create('error', 'Unable to load media at given url.');

				this.error.next();
			},
			onplayerror: () => {
				this.status = 'playerror';

				this.notifications.create('error', 'Unable to stream media at given url.');

				this.error.next();
			},
			onplay: () => {
				this.status = 'playing';
				this.played.emit();
			},
			onend: () => {
				this.status = 'ended';
			},
			onpause: () => {
				this.status = 'paused';
			},
			onstop: () => {
				this.status = 'stopped';
			}
		});

	}

	/**
	 * Plays player
	 *
	 * @return     void
	 */
	play(): void{
		//Reset status
		this.status = undefined;

		//Get player sources array, then init player
		this.getPlaySource().then((sources) => {

			//Re-init player
			this.initPlayer(sources);
			
			this.player.play();
		});
	}

	/**
	 * Pauses player
	 *
	 * @return     void
	 */
	pause(): void{
		//Unload player
		this.player.unload();
	}

	/**
	 * Determines if player playing
	 *
	 * @return     boolean  True if playing, False otherwise.
	 */
	isPlaying(): boolean{
		return (this.player && this.player.playing());
	}

	/**
	 * Determines if player loading/buffering.
	 *
	 * @return     boolean  True if loading, False otherwise.
	 */
	isLoading(): boolean{
		return (this.status == undefined) ? true : false;
	}


}
