import TravelCard from './TravelCard';

class GroundTravelCard extends TravelCard {
	constructor(fromLoc, toLoc, additionInfo={}, transportType='ground_travel') {
		super(fromLoc, toLoc, transportType);
		this.transportName = transportType.split('_').join(' ');
		this.seat = additionInfo.seat;
	}
	getTransportInfo() {
		return `Take the ${this.transportName} from ${this.fromLocation.name} to ${this.toLocation.name}.`;
	}

	getAdditionInfo() {
		return this.seat ? ` Seat ${this.seat}.` : ` No seat assigment.`;
	}
}

export default GroundTravelCard;