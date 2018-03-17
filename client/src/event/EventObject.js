
class EventObject {

	constructor(obj) {
		const EVENT_HOLIDAY=0;
		const EVENT_MEETING=1;
		const EVENT_WORK=2;
		const EVENT_APPOINTMENT=3;
		const EVENT_CELEBRATION=4;

		if (obj) {
			this.name = obj.name || obj.eventName;
			this.priority = obj.priority;
			this.startDate = obj.startDate;
			this.startTime = obj.startTime;
			this.endDate = obj.endDate;
			this.endTime = obj.endTime;
			this.eventType = obj.eventType || obj.eventTypeId;
			this.id = obj.id || obj._id;
		}
	}

	set(obj) {
		this.name = obj.name || obj.eventName;
		this.priority = obj.priority;
		this.startDate = obj.startDate;
		this.startTime = obj.startTime;
		this.endDate = obj.endDate;
		this.endTime = obj.endTime;
		this.eventType = obj.eventType || obj.eventTypeId;
		this.id = obj.id || obj._id;
	}

	copyTo(dst) {
		dst.name = this.name;
		dst.startDate = this.startDate;
		dst.startTime = this.startTime;
		dst.endDate = this.endDate;
		dst.endTime = this.endTime;
		dst.priority = this.priority;
		dst.eventTypeId = dst.eventType = this.eventType;
	}

	//-- can use these to be explicit, if we find too many problems with Mongo's _id vs id
	setId(id) {
		this.id=id;
	}

	getId(id) {
		return this.id;
	}

	isHoliday() {
		return (this.eventType===this.EVENT_HOLIDAY);
	}

	convertDatesToMillisecs() {
		if (parseInt(this.startDate)===NaN) {
			this.startDate = this.startDate.date();
		}
		if (parseInt(this.endDate)===NaN) {
			this.endDate = this.endDate.date();
		}
	}
}

export default EventObject;
