// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	now_playing: {
		provider: 1,
		data_url: 'http://np.tritondigital.com/public/nowplaying?mountName=WSPKFMAAC&numberToFetch=1&eventType=track',
		generic_cover: './assets/img/generic-cover-art.jpg',
		format_tracks: true,
		default_title: 'Unknown Title',
		default_artist: 'Unknown Artist'
	},
	streaming: {
		url: 'http://provisioning.streamtheworld.com/m3u/WSPKFMAAC.m3u',
		format: ['aac', 'mp3'],
		html5: true,
		autoplay: true
	}
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
