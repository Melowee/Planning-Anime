const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

function setContent(animes) {
	days.forEach(function (day) {
		if (animes[day]) {
			animes[day].sort(function(a, b){
				var hourA = a.firstChild.getAttribute('title').split('>')[1].split(' ')[4];
				var hourB = b.firstChild.getAttribute('title').split('>')[1].split(' ')[4];
				if (hourA < hourB) {
					return -1;
				} else {
					return 1;
				}
			});

			animes[day].forEach(function (anime) {
				var newAnime = document.createElement('div');

				var titre = anime.getAttribute('data-title');
				var heure = anime.firstChild.getAttribute('title').split('>')[1].split(' ')[4];
				var url = anime.querySelector('div.anime-image').getAttribute('data-src');

				var newHTML = "<strong>".concat(titre).concat("</strong>");
	            newHTML = newHTML.concat("<br>").concat(heure);
				newHTML = newHTML.concat("<br><img class='jaquette' src='").concat(url).concat("' />");

				newAnime.innerHTML = newHTML;
				document.getElementById(day).appendChild(newAnime);
			});
		}
	});
}

function updatePlanning(htmlDoc) {
	/*
	var elements = htmlDoc.querySelectorAll('div[data-status="CURRENT"');
	elements.forEach(function(v) {
		console.log(v.innerHTML);
	});
	*/

	var current = htmlDoc.querySelectorAll('div[data-status="CURRENT"');
	
	animes = {};

	current.forEach(function (anime) {
		if (anime.querySelector('div.badge-light-green') != null) {
			var day = anime.firstChild.getAttribute('title').split('>')[1].split(' ')[0];

			if (!animes[day]) {
				animes[day] = [];
			}

			animes[day].push(anime);
		}
	});
	setContent(animes);
}

function getAnimelist(pseudo) {
	//const proxy = 'https://cors-anywhere.herokuapp.com/';
	const proxy = 'https://cors-proxy.htmldriven.com/?url=';
	const AG = 'https://www.anime-gate.net/animelist/';

    $.get(proxy + AG  + pseudo, function(data) {
		var parser = new DOMParser();
		updatePlanning(parser.parseFromString(data, 'text/html'));
	});
}

function init() {
	getAnimelist('melowee');
}

window.addEventListener('load', init, false);
