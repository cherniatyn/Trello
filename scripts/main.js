(function () {
	var cards = [];
	var addCardElements = [];

	var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'];

	var findElemFromArray = function (array, className) {
		return array.find(function(value) {
			return value.className === className;
		});
	};
		
	var cardDragStart = function(event) {
		
		var card = findElemFromArray(event.path, 'card');

		event.dataTransfer.setData('elem', card.id);
	};

	var cardDrop = function(event) {
		var card = event.dataTransfer.getData('elem');

		var targetElem = findElemFromArray(event.path, 'card');
		var group = findElemFromArray(event.path, 'group');

		// if (targetElem === null || targetElem === undefined)
		// 	targetElem = group.children[group.children.length - 1];

		group.insertBefore(document.getElementById(card), targetElem);
	};

	var removeCard = function(event) {
		var card = event.target.parentElement;
		//card.removeEventListener('ondragstart', cardDragStart, false);
		return card.parentElement.removeChild(cards.splice(cards.indexOf(card), 1)[0]);
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

	var getCardContent = function (id) {
		var cardContent = document.createElement('div');
		cardContent.classList.toggle('card-content');

		var progressElement = document.createElement('progress');
		progressElement.className = 'card-content progress';
		progressElement.max = 100;
		progressElement.value = 10;
		cardContent.appendChild(progressElement);

		var titleElement = document.createElement('h2');
		titleElement.className = 'card-content title';
		titleElement.innerText = 'Title' + id;

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

	var createNewCard = function (event) {
		var cardTemplate = document.createElement('div');
		cardTemplate.classList.toggle('card');
		cardTemplate.draggable = true;
		cardTemplate.ondragstart = cardDragStart;
		cardTemplate.ondrop = cardDrop;
		//cardTemplate.addEventListener('ondragstart', cardDragStart, false);
		cardTemplate.id = cards.length;
		cardTemplate.appendChild(getRemoveBlock());
		cardTemplate.appendChild(getCardContent(cardTemplate.id));
		cards.push(cardTemplate);

		// groupElement.childNodes = cards;

		var parent = event.target.parentElement; 

		parent.insertBefore(cardTemplate, parent.children[parent.children.length - 1]);
	};

	Array.prototype.forEach.call(document.getElementsByClassName('group'), function (element) {
		//element.ondrop = cardDrop;
		element.ondragover = function(event) { event.preventDefault(); };
		//element.addEventListener('ondrop', cardDrop, false);
		var elem = element.children[element.children.length - 1];
		elem.addEventListener('click', createNewCard, false);
		addCardElements.push(elem);
	});	

	window.onbeforeunload = function (e) {
		e.preventDefault();

		// Array.prototype.forEach.call(document.getElementsByClassName('group'), function (element) {
		// 	element.removeEventListener('ondrop', cardDrop, false);
		// });	

		Array.prototype.forEach.call(addCardElements, function (element) {
			element.removeEventListener('click', createNewCard, false);
		});
	};
}());
