/**
 * @author slayerid.montano@gmail.com.
 */

import TLocation from '../TLocation';
import TravelCard from '../transport/TravelCard';
import TrainCard from  '../transport/TrainCard';
import BusCard from  '../transport/BusCard';
import AirTravelCard from '../transport/AirTravelCard';

import TravelSorter from '../TravelSorter.js';


describe('Travel tests', () => {
    "use strict";
    var A,B,C,D,E,F,G,H,I,J,K,L;
	var tSorter;

    beforeEach(() => {
        tSorter = new TravelSorter();	

		 A = new TLocation('A');
		 B = new TLocation('B');
		 C = new TLocation('C');
		 D = new TLocation('D');
		 E = new TLocation('E');
		 F = new TLocation('F');
		 G = new TLocation('G');
		 H = new TLocation('H');
		 I = new TLocation('I');
		 J = new TLocation('J');
		 K = new TLocation('K');
		 L = new TLocation('L');
    });

    afterEach(() => {
    	new TravelCard(C, D)._destroyId();
    	new TLocation('-')._destroyId();
    })


    it('Test1', () => {    
        var caseList = [
			new TravelCard(C, D),
			new TravelCard(A, B),
			new TravelCard(H, I),
			new TravelCard(I, C),
			new TravelCard(E, F),
			new TravelCard(F, C),
			new TravelCard(C, J),
			new TravelCard(D, E),
			new TravelCard(C, G),
			new TravelCard(G, H),
			new TravelCard(B, C)
		];
		tSorter.setList(caseList);
		var routes = tSorter.getTravelDescription();
		console.log(routes.fullDescription);
        expect(routes.travelList).toEqual([1, 10, 8, 9, 2, 3, 0, 7, 4, 5, 6]);

    });

    it('Test 2 (like from test task)', () => {    
 		
    	var Mad = new TLocation('Madrid');
    	var Barca = new TLocation('Barcelona');
    	var Ger = new TLocation('Gerona');
 		var St = new TLocation('Stockholm');
 		var NY = new TLocation('New York JFK');

        var caseList = [
	        new AirTravelCard(Ger, St, {
	        	flightNumber: 'SK455',
				gate: '45B',
				seat: '3A',
				ticketCounter: '177'
	        }),
	        new BusCard(Barca, Ger),
			new TrainCard(Mad, Barca, {
				carriageNumber: 12,
				seat: 26
			}),
			new AirTravelCard(St, NY, {
				flightNumber: 'SK22',
				gate: '8B',
				seat: '16F',
				isAutoBaggage: true
			})
		];

		tSorter.setList(caseList);
		var routes = tSorter.getTravelDescription();
		console.log(routes.fullDescription);
        expect(routes.travelList).toEqual([2, 1, 0, 3]);
    });

    it('Test3', () => {    
        var caseList = [
			new TravelCard(B, C),
			new TravelCard(C, D),
			new TravelCard(F, C),
			new TravelCard(C, G),
			new TravelCard(A, B),
			new TravelCard(D, E),
			new TravelCard(E, F),
			new TravelCard(J, B),
			new TravelCard(I, A),
			new TravelCard(G, K),
			new TravelCard(K, L),
			new TravelCard(L, A)
		];
		tSorter.setList(caseList);
		var routes = tSorter.getTravelDescription();
		console.log(routes.fullDescription);
        expect(routes.travelList).toEqual([ 8, 4, 0, 1, 5, 6, 2, 3, 9, 10, 11 ]);
    });
    
});


