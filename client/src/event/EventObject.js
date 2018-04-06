import "date-format-lite";

class EventObject {

	constructor(obj) {


		//-- TODO: colors can be overwritten by user settings
		EventObject.eventColor = {
			"0": "#FFDC00",
			"1": "#3D9970",
			"2": "#7FDBFF",
			"3": "#FF851B",
			"4": "#B10DC9",
		}

		if (obj) {
			this.name = obj.name || obj.eventName;
			this.priority = obj.priority;
			this.startDate = obj.startDate.date('YYYY-MM-DD','+00');
			this.startTime = obj.startTime;
			this.endDate = obj.endDate.date('YYYY-MM-DD','+00');
			this.endTime = obj.endTime;
			this.eventType = obj.eventType || obj.eventTypeId || 0;
			this.id = obj.id || obj._id;
			this.spanning = obj.spanning || false;
			this.spanningStart = obj.spanningStart;
		}
	}

	set(obj) {
		this.name = obj.name || obj.eventName;
		this.priority = obj.priority;
		this.startDate = obj.startDate.date('YYYY-MM-DD','+00');
		this.startTime = obj.startTime;
		this.endDate = obj.endDate.date('YYYY-MM-DD','+00');
		this.endTime = obj.endTime;
		this.eventType = obj.eventType || obj.eventTypeId;
		this.id = obj.id || obj._id;
		this.spanning = obj.spanning;
		this.spanningStart = obj.spanningStart;
	}

	copyTo(dst) {
		dst.name = this.name;
		dst.startDate = this.startDate;
		dst.startTime = this.startTime;
		dst.endDate = this.endDate;
		dst.endTime = this.endTime;
		dst.priority = this.priority;
		dst.eventTypeId = dst.eventType = this.eventType;
		dst.spanning = this.spanning;
		dst.spanningStart = this.spanningStart;
	}

	//-- can use these to be explicit, if we find too many problems with Mongo's _id vs id
	setId(id) {
		this.id=id;
	}

	getId(id) {
		return this.id;
	}

	getEventColor() {
		return EventObject.eventColor[this.eventType];
	}

	isHoliday() {
		return (this.eventType===EventObject.EVENT_HOLIDAY || this.eventTypeId===EventObject.EVENT_HOLIDAY);
	}

	convertDatesToMillisecs() {
		if (Number.isInteger(this.startDate)===false) {
			this.startDate = Number(this.startDate.concat("T00:00:00Z").date('U',"+00"));
		}
		if (Number.isInteger(this.endDate)===false) {
			this.endDate = Number(this.endDate.concat("T00:00:00Z").date('U',"+00"));
		}
	}
}

//-- consts
EventObject.EVENT_HOLIDAY=0;
EventObject.EVENT_MEETING=1;
EventObject.EVENT_WORK=2;
EventObject.EVENT_APPOINTMENT=3;
EventObject.EVENT_CELEBRATION=4;

export default EventObject;
