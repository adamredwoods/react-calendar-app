import EventObject from './EventObject';

describe('EventObject test: ', () => {
	var obj;
	it('should create new object', () => {
		obj = new EventObject({
			name: "testname",
			priority: 1,
			startDate: '2020-02-20',
			startTime: '9:30am',
			endDate: '2020-02-20',
			endTime: '1:45pm',
			eventType: 1,
			id: 0,
			spanning: false,
			spanningStart: 0
		})
		expect(obj).toBeDefined();
	})

  it('should convert date to millisecs', () => {
    obj.convertDatesToMillisecs();
	 expect(obj.startDate).toEqual(1582156800000);
	 expect(obj.endDate).toEqual(1582156800000);
  })
})
