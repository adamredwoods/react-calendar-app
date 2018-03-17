
class EventObject {

	constructor(obj) {
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


}

export default EventObject;
