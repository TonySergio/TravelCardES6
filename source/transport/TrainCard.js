import GroundTravelCard from './GroundTravelCard';

class TrainCard extends GroundTravelCard {
	constructor(fromLoc, toLoc, additionInfo={}) {
		super(fromLoc, toLoc, additionInfo, 'train');
		this.carriageNumber = additionInfo.carriageNumber;
	}
	getAdditionInfo() {
		return super.getAdditionInfo() + (this.carriageNumber ? ` Carriage number ${this.carriageNumber}.` : ` No carriage number assigment.`);
	}
}
export default TrainCard;
