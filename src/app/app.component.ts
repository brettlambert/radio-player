import { Component } from '@angular/core';

import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

import { StreamingService } from './_services/streaming.service';

import { NotificationsService } from './_services/notifications.service';

@Component({
	selector: 'app-root',
	animations: [ 
		trigger('routerTransition', [
			transition('* <=> *', [
				query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),
				group([
					query(':enter', [
						style({ transform: 'translateY(100%)' }),
						animate('0.3s ease-in-out', style({ transform: 'translateY(0%)' }))
					], { optional: true }),
					query(':leave', [
						style({ transform: 'translateY(0%)' }),
						animate('0.3s ease-in-out', style({ transform: 'translateY(100%)' }))
					], { optional: true }),
				])
			])
		])
	],
	templateUrl: './app.component.html',
	styleUrls: [
	'./app.component.scss'
	]
})
export class AppComponent {

	title = 'app';

	streamingPlayer;

	constructor(private streaming: StreamingService, private notifications: NotificationsService){
	}

	/**
	 * Gets router state
	 *
	 * @param      RouterOutlet  outlet  The outlet
	 * @return     string  The state.
	 */
	getState(outlet): string {
		return outlet.activatedRouteData.state;
	}

	/**
	 * Plays/pauses audio streaming
	 *
	 * @return     void
	 */
	toggleStreamingPlayer(): void{
		if(this.streaming.player.playing()){
			this.streaming.pause();
		}else{
			this.streaming.play();
		}
	}

	/**
	 * Removes a notification.
	 *
	 * @param      string  id      The identifier
	 * @return     void
	 */
	removeNotification(id: string): void{
		this.notifications.remove(id);
	}

	ngOnInit(){
		
	}
}
