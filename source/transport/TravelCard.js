let _id = 0;

class TravelCard {
	constructor(fromLoc, toLoc, transportType=null) {
		this.id = TravelCard.getId();
		this.fromLocation = fromLoc;
		this.toLocation = toLoc;
		this.transportType = transportType;
	}

	getRouteDescription() {
		return this.getTransportInfo() + this.getAdditionInfo();
	}

	getTransportInfo() {
		return `Travel from ${this.fromLocation.name} to ${this.toLocation.name}`;
	}

	getAdditionInfo() {
		return '';
	}

	_destroyId() {
		TravelCard.destroyId();	
	}
    static getId() {
    	return _id++;
    }
    static destroyId() {
    	_id = 0;
    }
}
export default TravelCard;