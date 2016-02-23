/*
	Пункт маршрута
*/

let _id = 0;

class TLocation {
	constructor(name, country='-') {
		this.id = TLocation.getId();
		this.name = name;
		this.country = country;
	}

	_destroyId() {
		TLocation.destroyId();	
	}
    static getId() {
    	return _id++;
    }
    static destroyId() {
    	_id = 0;
    }
}

export default TLocation;