export const environment = {
	production: true,
	now_playing: {
		provider: 1,
		data_url: 'http://np.tritondigital.com/public/nowplaying?mountName=WSPKFMAAC&numberToFetch={{limit}}&eventType=track',
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
