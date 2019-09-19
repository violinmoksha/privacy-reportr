class PersonModel // bools for display, whether instanced as values or labels bools
{
	constructor(guid, first_nameV, middle_nameV, last_nameV, emailV, phoneV, zipcodeV, codeOTheDayV, socialMediaURLV, socialSecurityNumberV, driversLicenseV, passportNumberV, passportNationV, ageV, otherNamesUsedInThePastV, // pii
      dxV, rxV, bloodGrpV, inTheKnowV, compliantPatientV, governmentFoodSubsistenceV, // phi
      nonPciAcctV, nonPciSecDigitzV, // pci

			first_nameL, middle_nameL, last_nameL, emailL, phoneL, zipcodeL, codeOTheDayL, socialMediaURLL, socialSecurityNumberL, driversLicenseL, passportNumberL, passportNationL, ageL, otherNamesUsedInThePastL, // pii
		  dxL, rxL, bloodGrpL, inTheKnowL, compliantPatientL, governmentFoodSubsistenceL, // phi
		  nonPciAcctL, nonPciSecDigitzL // pci
    )
	{
    this.pii = {};
		this.pii.guid = guid;

		this.pii.first_nameV = first_nameV;
		this.pii.middle_nameV = middle_nameV;
		this.pii.last_nameV = last_nameV;
		this.pii.emailV = emailV;
		this.pii.phoneV = phoneV;
		this.pii.zipcodeV = zipcodeV;
    this.pii.codeOTheDayV = codeOTheDayV;
		this.pii.socialMediaURLV = socialMediaURLV;
		this.pii.socialSecurityNumberV = socialSecurityNumberV;
		this.pii.driversLicenseV = driversLicenseV;
		this.pii.passportNumberV = passportNumberV;
		this.pii.passportNationV = passportNationV;
		this.pii.ageV = ageV;
		this.pii.otherNamesUsedInThePastV = otherNamesUsedInThePastV;

		this.phi = {};
    this.phi.dxV = dxV;
    this.phi.rxV = rxV;
    this.phi.bloodGrpV = bloodGrpV;
    this.phi.inTheKnowV = inTheKnowV;
    this.phi.compliantPatientV = compliantPatientV;
		this.phi.governmentFoodSubsistenceV = governmentFoodSubsistenceV;

		this.pci = {};
    this.pci.nonPciIdFromEcommAPIV = nonPciAcctV;
    this.pci.nonPciCCThreeDigitsV = nonPciSecDigitzV;

		this.pii.first_nameL = first_nameL;
		this.pii.middle_nameL = middle_nameL;
		this.pii.last_nameL = last_nameL;
		this.pii.emailL = emailL;
		this.pii.phoneL = phoneL;
		this.pii.zipcodeL = zipcodeL;
    this.pii.codeOTheDayL = codeOTheDayL;
		this.pii.socialMediaURLL = socialMediaURLL;
		this.pii.socialSecurityNumberL = socialSecurityNumberL;
		this.pii.driversLicenseL = driversLicenseL;
		this.pii.passportNumberV = passportNumberV;
		this.pii.passportNationV = passportNationV;
		this.pii.ageV = ageV;
		this.pii.otherNamesUsedInThePastV = otherNamesUsedInThePastV;

    this.phi.dxL = dxL;
    this.phi.rxL = rxL;
    this.phi.bloodGrpL = bloodGrpL;
    this.phi.inTheKnowL = inTheKnowL;
    this.phi.compliantPatientL = compliantPatientL;
		this.phi.governmentFoodSubsistenceL = governmentFoodSubsistenceL;

    this.pci.nonPciIdFromEcommAPIL = nonPciAcctL;
    this.pci.nonPciCCThreeDigitsL = nonPciSecDigitzL;
	}
}

module.exports = PersonModel;
