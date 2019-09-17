class PersonModel // bools for display, whether instanced as values or labels bools
{
	constructor(guid, first_nameV, last_nameV, emailV, zipcodeV, codeOTheDayV, // pii
      dxV, rxV, bloodGrpV, inTheKnowV, compliantPatientV, // phi
      nonPciAcctV, nonPciSecDigitzV, // pci

			first_nameL, last_nameL, emailL, zipcodeL, codeOTheDayL, // pii
		  dxL, rxL, bloodGrpL, inTheKnowL, compliantPatientL, // phi
		  nonPciAcctL, nonPciSecDigitzL // pci
    )
	{
    this.pii = {};
		this.pii.guid = guid;

		this.pii.first_nameV = first_nameV;
		this.pii.last_nameV = last_nameV;
		this.pii.emailV = emailV;
		this.pii.zipcodeV = zipcodeV;
    this.pii.codeOTheDayV = codeOTheDayV;

		this.phi = {};
    this.phi.dxV = dxV;
    this.phi.rxV = rxV;
    this.phi.bloodGrpV = bloodGrpV;
    this.phi.inTheKnowV = inTheKnowV;
    this.phi.compliantPatientV = compliantPatientV;

		this.pci = {};
    this.pci.nonPciIdFromEcommAPIV = nonPciAcctV;
    this.pci.nonPciCCThreeDigitsV = nonPciSecDigitzV;

		this.pii.first_nameL = first_nameL;
		this.pii.last_nameL = last_nameL;
		this.pii.emailL = emailL;
		this.pii.zipcodeL = zipcodeL;
    this.pii.codeOTheDayL = codeOTheDayL;

    this.phi.dxL = dxL;
    this.phi.rxL = rxL;
    this.phi.bloodGrpL = bloodGrpL;
    this.phi.inTheKnowL = inTheKnowL;
    this.phi.compliantPatientL = compliantPatientL;

    this.pci.nonPciIdFromEcommAPIL = nonPciAcctL;
    this.pci.nonPciCCThreeDigitsL = nonPciSecDigitzL;
	}
}

module.exports = PersonModel;
