# Radio Player

An Angular 6 streaming audio player with now playing and meta-data formatting.

This project was created to serve as a refresher of my Angular development skills after the release of Angular 6.

---

## Configuring The Player

Configuring the player requires rebuilding the Angular project after changing the appropriate environment file(s).

#### Now Playing - controls configurable variables for the now playing service.

As of this release the player supports now playing data from Triton Digital and RadioDJ (requires custom template files, which are included).

* __provider__ - Use a value of 1 for Triton Digital and 2 for RadioDJ.
* __data_url__ - Direct URL for now playing data feed.
	* __Example Triton URL__ - http://np.tritondigital.com/public/nowplaying?mountName=__MOUNTNAME__&eventType=track&numberToFetch={{limit}} (change __MOUNTNAME__)
	* __RadioDJ__ - Direct link to the __now-playing.json__ file generated in the same directory as the included __radiodj-update.php__ file.

* __generic_cover__ - Default cover art for tracks that cannot be formatted.
* __format_tracks__ - Enables (1) or disables (0) track meta-data formatting via iTunes.

#### Streaming - control configurable variables for streaming player.

* __url__ - Direct URL for streaming media.
* __format__ - Array of formats expected from streaming URL.
* __html5__ - Enables/disables HTML5 Streaming (recommended).

#### RadioDJ - Configuring RadioDJ automation system now playing output for radio player.

1. Upload included "./now-playing-data/radiodj-update.php" and "./now-playing-data/now-playing.json" files into the same public accessible directory of your web server.
2. Change password inside of "radiodj-update.php" file to something more secure.
3. Ensure proper writing permissions for "now-playing.json" file.
4. Click "Now Playing Info" button on bottom of RadioDJ window.
5. Navigate to "Web Export" tab.
6. Input __direct url__ of "radiodj-update.php" file.
7. Input the following custom data value in the "Custom Data" field. __Change "xpwd" value to chosen password from above.__
```
artist=$artist$&title=$title$&album=$album$&duration=$duration$&xpwd=changeme
```
8. Change "Method" to POST.
9. Enable, save new export (floppy disk), check "Active" checkbox, and then save via bottom "Save" button of popup window.
10. RadioDJ should now be exporting now playing data for the radio player!

---

## License

This project has been released under a MIT License.