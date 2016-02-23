import TravelCard from './TravelCard';

class AirTravelCard extends TravelCard {
	constructor(fromLoc, toLoc, additionInfo={}, transportType='air_travel') {
		super(fromLoc, toLoc, transportType);
		this.flightNumber = additionInfo.flightNumber;
		this.gate = additionInfo.gate;
		this.seat = additionInfo.seat;
		this.ticketCounter = additionInfo.ticketCounter;
		this.isAutoBaggage = additionInfo.isAutoBaggage || false;
	}
	getTransportInfo() {
		return `From ${this.fromLocation.name} Airport, take flight ${this.flightNumber} to ${this.toLocation.name}.`
	}

	getAdditionInfo() {
		return `Gate ${this.gate}. Seat ${this.seat}. `
				+ (this.isAutoBaggage ? `Baggage will be automatically transferred from your last leg` 
									  : `Baggage drop at ticket counter ${this.ticketCounter}`);
	}
}

export default AirTravelCard;
