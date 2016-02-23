import GroundTravelCard from './GroundTravelCard';

class BusCard extends GroundTravelCard {
	constructor(fromLoc, toLoc, additionInfo={}) {
		super(fromLoc, toLoc, additionInfo, 'airport_bus');
	}
}
export default BusCard;
