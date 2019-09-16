const PersonModel = require("../models/person");

let Validator = require('fastest-validator');

let persons = {};
let counter = 0;

/* create instances of the validator */
let personValidator = new Validator();

/* customer validator shema */
const boolsValidSchema = {
	guid: {type: "string", min: 3}, // 4 c00kie
	first_name: {type: "boolean"},
	last_name: {type: "boolean"},
	email: {type: "boolean"},
	zipcode: {type: "boolean"},
	piiCodeOTheDay: {type: "boolean"},
	// end_pii
	dx: {type: "boolean"},
	rx: {type: "boolean"},
	bloodGrp: {type: "boolean"},
	inTheKnow: {type: "boolean"},
	compliantPatient: {type: "boolean"},
	// end_phi
  nonPciAcct: {type: "boolean"},
	nonPciSecDigitz: {type: "boolean"}
	// end_pci
};

/* person service class */
class PersonService
{
	static create(data)
	{
		var vres = personValidator.validate(data, boolsValidSchema);

		/* validation failed */
		if(!(vres === true))
		{
			let errors = {}, item;

			for(const index in vres)
			{
				item = vres[index];

				errors[item.field] = item.message;
			}

			throw {
			    name: "ValidationError",
			    message: errors
			};
		}

		let personValues = new PersonModel(data.guid, data.first_nameV, data.last_nameV, data.emailV, data.zipcodeV, data.codeOTheDayV, // pii
	      data.dxV, data.rxV, data.bloodGrpV, data.inTheKnowV, data.compliantPatientV, // phi
	      data.nonPciAcctV, data.nonPciSecDigitzV);
		let personLabels = new PersonModel(data.guid, data.first_nameL, data.last_nameL, data.emailL, data.zipcodeL, data.codeOTheDayL, // pii
	      data.dxL, data.rxL, data.bloodGrpL, data.inTheKnowL, data.compliantPatientL, // phi
	      data.nonPciAcctL, data.nonPciSecDigitzL);

		personValues.uid = 'pv' + counter;
		personLabels.uid = 'pl' + counter++;

		persons[personValues.uid] = {};
		persons[personValues.uid].values = personValues;
		persons[personLabels.uid].labels = personLabels;

		return persons[personValues.uid];
	}

	static retrieve(uid)
	{
		if(persons[uid] != null)
		{
			return persons[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a person by (uid:'+ uid +')');
		}
	}

	// TODO abstract update wip
	static update(uid, data)
	{
		if(persons[uid] != null)
		{
			const person = persons[uid];

			Object.assign(person, data);
		}
		else
		{
			throw new Error('Unable to retrieve a person by (uid:'+ cuid +')');
		}
	}

	// NB: we might do this to safeguard a person in some instance
	static delete(uid)
	{
		if(persons[uid] != null)
		{
			delete persons[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a person by (uid:'+ cuid +')');
		}
	}
}

module.exports = PersonService;
