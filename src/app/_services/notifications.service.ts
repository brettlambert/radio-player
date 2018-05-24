import { Injectable } from '@angular/core';

import { Notification } from '../_models/notification.model';

@Injectable({
	providedIn: 'root'
})
export class NotificationsService {

	stack: Notification[] = [];

	constructor() { }

	/**
	 * Creates a notification
	 *
	 * @param      string  type     The type
	 * @param      string  message  The message
	 */
	create(type: string, message: string){
		let notification = new Notification({ type: type, message: message });

		this.stack.push(notification);

		setTimeout(() => {
			this.stack = this.stack.filter((obj) => { obj['id'] !== notification['id'] });
		}, 10000);
	}

	/**
	 * Removes notification from stack
	 *
	 * @param      string  id      The identifier
	 */
	remove(id: string): void{
		this.stack = this.stack.filter((obj) => { obj['id'] !== id });
	}
}
