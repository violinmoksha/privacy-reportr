class PersonModel // bools for display, whether instanced as values or labels bools
{
	constructor(guid, first_name, last_name, email, zipcode, codeOTheDay, // pii
      dx, rx, bloodGrp, inTheKnow, compliantPatient, // phi
      nonPciAcct, nonPciSecDigitz // pci
      )
	{
    this.pii = {};
		this.pii.guid = guid;
		this.pii.first_name = first_name;
		this.pii.last_name = last_name;
		this.pii.email = email;
		this.pii.zipcode = zipcode;
    this.pii.codeOTheDay = codeOTheDay;

    this.phi.dx = dx;
    this.phi.rx = rx;
    this.phi.bloodGrp = bloodGrp;
    this.phi.inTheKnow = inTheKnow;
    this.phi.compliantPatient = compliantPatient;

    this.pci.nonPciIdFromEcommAPI = nonPciId;
    this.pci.nonPciCCThreeDigits = nonPciSecDigitz;

    // and perhaps psi, f.e. data we absolutely should not ever have ;-)
	}
}

module.exports = PersonModel;
