var DEBUG_MODE = true;

var texts = DEBUG_MODE ? ['---start', '---end'] : ['Your travel routes list:', 'Have a good trip'];
var WELCOME_TEXT = texts[0];
var BYE_TEXT = texts[1];

/**
 * @class TravelSorter - представляет бизнес-логику сортировщика карточек путешественника
 */	
class TravelSorter{
	constructor(travelList=[]) {
		this.cardList = travelList;
	}

	//private API

	/**
	 * @returns {Array} - вернет отсортированный список индексов (from A - origin travel point to B - finished point)		
	 */
	_getSortList() {
		let start = this.cardList[0];
		let current = start;

		let sortFun = (a, b) => {
			return a.length <= b.length ? 1 : -1;
		};

		//получить списоквозможных обратных маршрутов по выбранной локации туристической карты
		let allPrevRoutes = this._getNextRoutes(this._findPrevs, this.cardList, current, [current.id]);

		//отсортировать списки по наибольшей длине
		allPrevRoutes.sort(sortFun);

		let leftRouteCollection = allPrevRoutes[0];
		leftRouteCollection.reverse();

		//избавиться от уже пройденного маршрута
		let reducedCardList = this.cardList.filter(it => leftRouteCollection.indexOf(it.id) == -1);

		//получить список возможных прямых маршрутов по выбранной локации туристической карты
		let allNextRoutes = this._getNextRoutes(this._findNext, reducedCardList, current, [current.id]);
		allNextRoutes.sort(sortFun);

		let rightRouteCollection = allNextRoutes[0];
		rightRouteCollection = rightRouteCollection.splice(1);

		return leftRouteCollection.concat(rightRouteCollection);
	}

	_findPrevs(list, current) {
		return list.filter(it => current.fromLocation.id == it.toLocation.id);
	}
	_findNext(list, current) {
		return list.filter(it => current.toLocation.id == it.fromLocation.id);
	}
	
	/**
	 * @param {function} fun_next
	 * @param {array} list
	 * @param {object} current
	 * @param {array} nextRoutes
	 **/
	_getNextRoutes(fun_next, list, current, nextRoutes=[]) {

		let nextMoreRoutes = fun_next(list, current);
		let sortedList = [];

		if (nextMoreRoutes.length) {
			nextMoreRoutes.forEach(tmpRoute => {
				if (nextRoutes.indexOf(tmpRoute.id) == -1) {
					let _getRecursiveNext = this._getNextRoutes(fun_next, list, tmpRoute, nextRoutes.concat(tmpRoute.id));
					if (_getRecursiveNext.length) {
						if (nextRoutes.length == 1) {
							sortedList.push(_getRecursiveNext);
						}
						else {
							sortedList = _getRecursiveNext;
						}
					}
				}
			});
		}
		else {
			if (nextRoutes.length == 1) {
				sortedList.push(nextRoutes);
			}
			else {
				sortedList = nextRoutes;
			}
		}
		return sortedList;
	}
	
	//public API
	add(travelCard) {
		this.cardList.push(travelCard);
	}

	/**
	 * установка списка карт
	   Input format:
	   @param {Array} list - список карт маршрутов интерфейса TravelCard, пример:
	   		var A = new TLocation('New York');
	   		var B = new TLocation('San Francisco');
	   		var C, D, F, J ...
	   		...
			var trainCard = new TrainCard(A, B, {
				carriageNumber: 12,
				seat: 26

			});
			var busCard = new BusCard(C, D);	   
		   	var airCard = new AirTravelCard(F, J, {
				flightNumber: 'SK22',
				gate: '45B',
				seat: '3A',
				ticketCounter: '177'
			});

			var list = [trainCard, busCard, airCard]

	 */
	setList(list) {
		this.cardList = list;
	}

	/** получение объекта со словесным описанием маршрута(каждый отрезок с новой строки) 
		и массива с индексами отрезков 
	 * @returns {Object}, 
	 * Output format (with DEBUG_MODE = true):
	 *  travelList {Array} - отсортированный список индексов
	 *  fullDescription {String} - строка результата описания маршрута	
	 * ---start\n\r
	 * Route description line 1
	 * Route description line 2
	 * ........
	 * Route description line N
	 * ---end\n\r	
	 */
	getTravelDescription() {
		let cardList = this.cardList;
		let travelList = this._getSortList();
		let fullDescription = [WELCOME_TEXT];

		//for each travelList item invoke getRouteDescription
		travelList.forEach(travelCardId => {
			let travelCard = cardList.filter(card => card.id == travelCardId)[0];
			fullDescription.push(travelCard.getRouteDescription());
		});
		fullDescription.push(BYE_TEXT);

		return {
			travelList: travelList,
			fullDescription: fullDescription.join('\n\r')
		}
	}
}

export default TravelSorter;