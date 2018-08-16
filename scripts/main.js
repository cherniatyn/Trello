(function () {
	var cards = [];
	var groupElement = document.getElementsByClassName('group')[0];
	var addCardElement = groupElement.children[groupElement.children.length - 1];

	var removeCard = function(event) {
		return groupElement.removeChild(cards.splice(cards.indexOf(event.target.parentElement), 1)[0]);
	}; 

	var getRemoveBlock = function () {
		var removeBlockTemplate = document.createElement('span');
		removeBlockTemplate.className = 'card-remove';
		removeBlockTemplate.innerText = 'x';

		removeBlockTemplate.addEventListener('click', removeCard, false);
		return removeBlockTemplate;
	};

	var createNewCard = function () {
		var cardTemplate = document.createElement('div');
		cardTemplate.className = 'card';
		cardTemplate.innerText = cards.length;
		cardTemplate.appendChild(getRemoveBlock());
		cards.push(cardTemplate);

		// groupElement.childNodes = cards;

		groupElement.insertBefore(cardTemplate, addCardElement);
	};

	addCardElement.addEventListener('click', createNewCard, false);
}());
