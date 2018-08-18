(function () {
	var cards = [];
	var groupElement = document.getElementsByClassName('group')[0];
	var addCardElement = groupElement.children[groupElement.children.length - 1];
	var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'];

	var removeCard = function(event) {
		return groupElement.removeChild(cards.splice(cards.indexOf(event.target.parentElement), 1)[0]);
	}; 

	var getRemoveBlock = function () {
		var removeBlockTemplate = document.createElement('span');
		removeBlockTemplate.classList.toggle('card-remove');
		removeBlockTemplate.innerText = 'x';

		removeBlockTemplate.addEventListener('click', removeCard, false);
		return removeBlockTemplate;
	};

	var getDateFormat = function(date) {
		return weekday[date.getDay()] + ', ' + date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' +  (date.getYear() + 1900);
	};

	var getCardContent = function () {
		var cardContent = document.createElement('div');
		cardContent.classList.toggle('card-content');

		var progressElement = document.createElement('progress');
		progressElement.className = 'card-content progress';
		progressElement.max = 100;
		progressElement.value = 10;
		cardContent.appendChild(progressElement);

		var titleElement = document.createElement('h2');
		titleElement.className = 'card-content title';
		titleElement.innerText = 'Title';

		cardContent.appendChild(titleElement);

		var cardSubContent = document.createElement('div');
		cardSubContent.className = 'sub-content';

		var moreElement = document.createElement('span');
		moreElement.className = 'sub-content moreActions';
		moreElement.innerText = '...';

		cardSubContent.appendChild(moreElement);

		var date = new Date();
		var dateElement = document.createElement('time');
		dateElement.className = 'sub-content time';
		dateElement.dateTime = date;
		dateElement.innerText = getDateFormat(date);

		cardSubContent.appendChild(dateElement);

		var icoElement = document.createElement('img');
		icoElement.className = 'sub-content ico';
		icoElement.src = 'https://www.w3schools.com/images/colorpicker.gif';

		cardSubContent.appendChild(icoElement);

		cardContent.appendChild(cardSubContent);
		return cardContent;
	};

	var createNewCard = function () {
		var cardTemplate = document.createElement('div');
		cardTemplate.classList.toggle('card');
		// cardTemplate.innerText = cards.length;
		cardTemplate.appendChild(getRemoveBlock());
		cardTemplate.appendChild(getCardContent());
		cards.push(cardTemplate);

		// groupElement.childNodes = cards;

		groupElement.insertBefore(cardTemplate, addCardElement);
	};

	addCardElement.addEventListener('click', createNewCard, false);

	window.onbeforeunload = function (e) {
		e.preventDefault();
		addCardElement.removeEventListener('click', createNewCard, false);
	};
}());
