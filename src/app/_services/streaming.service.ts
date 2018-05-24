import { Injectable, EventEmitter, Output } from '@angular/core';
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

	constructor(private notifications: NotificationsService) {
		//Init player
		this.initPlayer();
	}


	/**
	 * Initalizes/loads player
	 *
	 * @return     void
	 */
	initPlayer(): void{
		this.player = new Howl({
			src: environment.streaming.url,
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

		//Re-init player
		this.initPlayer();

		this.player.play();
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
		return this.player.playing();
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
