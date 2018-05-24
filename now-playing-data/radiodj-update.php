<?php

$jsonLoc = "./now-playing.json";
$accessPassword = "changeme";

//If JSON file doesn't exist, attempt to create it.
if(!file_exists($jsonLoc)){
	//Attempt new file or die with error
	$jsonFile = fopen($jsonLoc, "w") or die('ERROR: Unable to create specified JSON file. Either manually create it or check permissions.');

	//Close new file
	fclose($jsonFile);

	//Set permission
	chmod($jsonLoc, 0755);
}

//If JSON file is not writable, die with error
if(!is_writable($jsonLoc)){
	die('ERROR: JSON file is not writable. Check file permissions.');
}

//Ensure both xpwd, artist, and title POST variables are set
if ((isset($_POST['xpwd'])) && (isset($_POST['title'])) && (isset($_POST['artist']))) {

	//Strip slashes from xpwd POST variable
	$xpwd= stripcslashes($_POST['xpwd']);

	//If password matches, process now playing information
	if ($xpwd == $accessPassword) {

		//Strip slashes from title POST variable
		$title = stripcslashes($_POST['title']);

		//Strip slashes from artist POST variable
		$artist = stripcslashes($_POST['artist']);

		//Strip slashes from album POST variable
		$album = stripcslashes($_POST['album']);

		//Strip slashes from duration POST variable
		$duration = stripcslashes($_POST['duration']);

		//Create empty array for JSON data
		$jsonData = [];

		//If title isset, set it
		if(isset($title)){
			$jsonData['title'] = trim($title);
		}

		//If artist isset, set it
		if(isset($artist)){
			$jsonData['artist'] = trim($artist);
		}

		//If album isset, set it as well
		if(isset($album)){
			$jsonData['album'] = trim($album);	
		}

		//If duration isset, set it as well
		if(isset($duration)){
			//Format duration into seconds
			$durationArr = explode(':', $duration);

			//Sum minutes and seconds, then into milliseconds
			$secondsDuration = (($durationArr[0] * 60) + $duration[1]) * 1000;

			$jsonData['duration'] = trim($secondsDuration);	
		}

		//Set played_at to now in milliseconds
		$jsonData['played_at'] = time() * 1000;

		//Put JSON data into JSON file
		if(!file_put_contents($jsonLoc, json_encode($jsonData))){
			//Could not put JSON data into file, die with error
			die('Error: Could not write JSON data to file. Check file permissions.');
		}
	}
}

?>