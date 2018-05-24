export const environment = {
	production: true,
	now_playing: {
		provider: 1,
		data_url: 'http://np.tritondigital.com/public/nowplaying?mountName=KMLEFMAAC&eventType=track&numberToFetch={{limit}}',
		generic_cover: './assets/img/generic-cover-art.jpg',
		format_tracks: true,
		default_title: 'Unknown Title',
		default_artist: 'Unknown Artist'
	},
	streaming: {
		url: 'http://192.168.254.64:8000/test.aac',
		format: ['aac', 'mp3'],
		html5: true
	}
};
