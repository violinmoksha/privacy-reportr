var express = require('express');
var router = express.Router();
var PersonService = require('../services/person');
var XLSX = require('js-xlsx');
var fs = require('fs');
var path = require('path');

/* GET Person prefs. */
router.get('/', async function(req, res, next)
{
	res.json({error: "Standard disavow goes here for attackers."});
});

/* retrieves a person by uid */
router.get('/:id', async (req, res, next) =>
{
	try
	{
		const person = await PersonService.retrieve(req.params.id);

		return res.json({ person: person });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* POST to report generation action */
router.post('/', async (req, res, next) => {
  const body = req.body;

	try
	{
		const person = await PersonService.create(body);

		/*if(body.guid != null)
		{
			person.guid = body.guid;
		}*/

		//res.cookie('guid', person.guid, { maxAge: 900000, httpOnly: true });
		res.cookie('guid', body.guid, { maxAge: 9000000, httpOnly: true});

		//return res.status(201).json({ person: person });

		// use these values here with js-xlsx to beautifully gen and DL the report
		var filename = "privacy-report.xlsx";
		var data = [['                  ', '                  ', 'Categories', 'Label  ', 'Value', 'Show Label?', 'Show Value?'],
											 ["Globally Unique ID", "d66e57bc-6b90-4715", "HR/PII", "First Name", "Paul",  "Y", "Y"],
											 ["                  ", "                  ", "      ", "Middle Name", "Edwin", "Y", "Y"],
											 ["                  ", "                  ", "      ", "Last Name", "Yeager", "Y", "Y"],
											 ["                  ", "                  ", "      ", "EMail", "pyeager@firstrepublic.com", "Y", "Y"],
											 ["                  ", "                  ", "      ", "Phone", "252-235-8335", "Y", "Y"],
											 ["                  ", "                  ", "      ", "Zipcode", "94930", "Y", "Y"],
											 ["                  ", "                  ", "      ", "Code Of the Day", "1234", "Y", "Y"],
											 ["                  ", "                  ", "      ", "Social Media URL", "https://github.com/violinmoksha", "Y", "Y"],
											 ["                  ", "                  ", "      ", "Social Security Number", "123-45-6789", "Y", "Y"],
											 ["                  ", "                  ", "      ", "Driver License Number", "123456789", "Y", "Y"],
											 ["                  ", "                  ", "      ", "Passport Number", "123456789", "Y", "Y"],
											 ["                  ", "                  ", "      ", "Passport Nation", "USA", "Y", "Y"],
											 ["                  ", "                  ", "      ", "Age", "38", "Y", "Y"],
											 ["                  ", "                  ", "      ", "Other Names Used in the Past", "NA", "Y", "Y"],
											 ["                  ", "                  ", "Health/PHI", "Medical Diagnosis", "Active Worker", "Y", "Y"],
											 ["                  ", "                  ", "      ", "Medical Prescription", "CoQ10 and Lecithin", "Y", "Y"],
											 ["                  ", "                  ", "      ", "Blood Group", "O-Positive", "Y", "Y"],
											 ["                  ", "                  ", "      ", "In the Know", "TRUE", "Y", "Y"],
											 ["                  ", "                  ", "      ", "Compliant Patient", "TRUE", "Y", "Y"],
											 ["                  ", "                  ", "      ", "Government Food Subsistence", "FALSE", "Y", "Y"],
											 ["                  ", "                  ", "FinTech/PCI", "Non-PCI Protected Acct ID", "123456-abcdefg", "Y", "Y"],
											 ["                  ", "                  ", "      ", "Non-PCI Protected CSC", "123", "Y", "Y"]
		];

		// TODO scrub it from the query params
		if (req.query.first_nameL == 'false') {
			data[1][3] = '<Non-NULL>';
			data[1][5] = 'N';
		}
		if (req.query.first_nameV == 'false') {
			data[1][4] = '<Non-NULL>';
			data[1][6] = 'N';
		}
		if (req.query.middle_nameL == 'false') {
			data[2][3] = '<Non-NULL>';
			data[2][5] = 'N';
		}
		if (req.query.middle_nameV == 'false') {
			data[2][4] = '<Non-NULL>';
			data[2][6] = 'N';
		}
		if (req.query.last_nameL == 'false') {
			data[3][3] = '<Non-NULL>';
			data[3][5] = 'N';
		}
		if (req.query.last_nameV == 'false') {
			data[3][4] = '<Non-NULL>';
			data[3][6] = 'N';
		}
		if (req.query.emailL == 'false') {
			data[4][3] = '<Non-NULL>';
			data[4][5] = 'N';
		}
		if (req.query.emailV == 'false') {
			data[4][4] = '<Non-NULL>';
			data[4][6] = 'N';
		}
		if (req.query.phoneL == 'false') {
			data[5][3] = '<Non-NULL>';
			data[5][5] = 'N';
		}
		if (req.query.phoneV == 'false') {
			data[5][4] = '<Non-NULL>';
			data[5][6] = 'N';
		}
		if (req.query.zipcodeL == 'false') {
			data[6][3] = '<Non-NULL>';
			data[6][5] = 'N';
		}
		if (req.query.zipcodeV == 'false') {
			data[6][4] = '<Non-NULL>';
			data[6][6] = 'N';
		}
		if (req.query.codeOTheDayL == 'false') {
			data[7][3] = '<Non-NULL>';
			data[7][5] = 'N';
		}
		if (req.query.codeOTheDayV == 'false') {
			data[7][4] = '<Non-NULL>';
			data[7][6] = 'N';
		}
		if (req.query.socialMediaURLL == 'false') {
			data[8][3] = '<Non-NULL>';
			data[8][5] = 'N';
		}
		if (req.query.socialMediaURLV == 'false') {
			data[8][4] = '<Non-NULL>';
			data[8][6] = 'N';
		}
		if (req.query.socialSecurityNumberL == 'false') {
			data[9][3] = '<Non-NULL>';
			data[9][5] = 'N';
		}
		if (req.query.socialSecurityNumberV == 'false') {
			data[9][4] = '<Non-NULL>';
			data[9][6] = 'N';
		}
		if (req.query.driversLicenseL == 'false') {
			data[10][3] = '<Non-NULL>';
			data[10][5] = 'N';
		}
		if (req.query.driversLicenseV == 'false') {
			data[10][4] = '<Non-NULL>';
			data[10][6] = 'N';
		}
		if (req.query.passportNumberL == 'false') {
			data[11][3] = '<Non-NULL>';
			data[11][5] = 'N';
		}
		if (req.query.passportNumberV == 'false') {
			data[11][4] = '<Non-NULL>';
			data[11][6] = 'N';
		}
		if (req.query.passportNationL == 'false') {
			data[12][3] = '<Non-NULL>';
			data[12][5] = 'N';
		}
		if (req.query.passportNationV == 'false') {
			data[12][4] = '<Non-NULL>';
			data[12][6] = 'N';
		}
		if (req.query.ageL == 'false') {
			data[13][3] = '<Non-NULL>';
			data[13][5] = 'N';
		}
		if (req.query.ageV == 'false') {
			data[13][4] = '<Non-NULL>';
			data[13][6] = 'N';
		}
		if (req.query.otherNamesUsedInThePastL == 'false') {
			data[14][3] = '<Non-NULL>';
			data[14][5] = 'N';
		}
		if (req.query.otherNamesUsedInThePastV == 'false') {
			data[14][4] = '<Non-NULL>';
			data[14][6] = 'N';
		}
		if (req.query.dxL == 'false') {
			data[15][3] = '<Non-NULL>';
			data[15][5] = 'N';
		}
		if (req.query.dxV == 'false') {
			data[15][4] = '<Non-NULL>';
			data[15][6] = 'N';
		}
		if (req.query.rxL == 'false') {
			data[16][3] = '<Non-NULL>';
			data[16][5] = 'N';
		}
		if (req.query.rxV == 'false') {
			data[16][4] = '<Non-NULL>';
			data[16][6] = 'N';
		}
		if (req.query.bloodGrpL == 'false') {
			data[17][3] = '<Non-NULL>';
			data[17][5] = 'N';
		}
		if (req.query.bloodGrpV == 'false') {
			data[17][4] = '<Non-NULL>';
			data[17][6] = 'N';
		}
		if (req.query.inTheKnowL == 'false') {
			data[18][3] = '<Non-NULL>';
			data[18][5] = 'N';
		}
		if (req.query.inTheKnowV == 'false') {
			data[18][4] = '<Non-NULL>';
			data[18][6] = 'N';
		}
		if (req.query.compliantPatientL == 'false') {
			data[19][3] = '<Non-NULL>';
			data[19][5] = 'N';
		}
		if (req.query.compliantPatientV == 'false') {
			data[19][4] = '<Non-NULL>';
			data[19][6] = 'N';
		}
		if (req.query.governmentFoodSubsistenceL == 'false') {
			data[20][3] = '<Non-NULL>';
			data[20][5] = 'N';
		}
		if (req.query.governmentFoodSubsistenceV == 'false') {
			data[20][4] = '<Non-NULL>';
			data[20][6] = 'N';
		}
		if (req.query.nonPciAcctL == 'false') {
			data[21][3] = '<Non-NULL>';
			data[21][5] = 'N';
		}
		if (req.query.nonPciAcctV == 'false') {
			data[21][4] = '<Non-NULL>';
			data[21][6] = 'N';
		}
		if (req.query.nonPciSecDigitzL == 'false') {
			data[22][3] = '<Non-NULL>';
			data[22][5] = 'N';
		}
		if (req.query.nonPciSecDigitzV == 'false') {
			data[22][4] = '<Non-NULL>';
			data[22][6] = 'N';
		}
		var ws_name = "PrivacyReport";

		function datenum(v, date1904) {
			if(date1904) v+=1462;
			var epoch = Date.parse(v);
			return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
		}

		function sheet_from_array_of_arrays(data, opts) {
			var ws = {};
			var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
			for(var R = 0; R != data.length; ++R) {
				for(var C = 0; C != data[R].length; ++C) {
					if(range.s.r > R) range.s.r = R;
					if(range.s.c > C) range.s.c = C;
					if(range.e.r < R) range.e.r = R;
					if(range.e.c < C) range.e.c = C;
					var cell = {v: data[R][C] };
					if(cell.v == null) continue;
					var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

					if(typeof cell.v === 'number') cell.t = 'n';
					else if(typeof cell.v === 'boolean') cell.t = 'b';
					else if(cell.v instanceof Date) {
						cell.t = 'n'; cell.z = XLSX.SSF._table[14];
						cell.v = datenum(cell.v);
					}
					else cell.t = 's';

					ws[cell_ref] = cell;
				}
			}
			if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);

		  // set default column width
		  var wscols = [];
		  data[0].forEach(() => {
				wscols.push({wch:30})
			});
		  ws['!cols'] = wscols;

			ws['C2'].s = {fill:{fgColor: {rgb:"FAED27"}}};
			ws['C16'].s = ws['C2'].s;
			ws['C22'].s = ws['C16'].s;

		  return ws;
		}

		function Workbook() {
		  if(!(this instanceof Workbook)) return new Workbook();
		  this.SheetNames = [];
		  this.Sheets = {};
		}

		var wb = new Workbook();

		/* add worksheet to workbook */
		wb.SheetNames.push(ws_name);
		wb.Sheets[ws_name] = sheet_from_array_of_arrays(data);

		/* write workbook */
		XLSX.writeFile(wb, __dirname+'/../public/'+filename);

		var file = fs.readFileSync(path.resolve(__dirname+'/../public/'+filename), 'binary');

		res.setHeader('Content-Length', file.length);
		res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
  	res.setHeader('Content-type', 'application/xlsx');

		res.write(file, 'binary');
		res.end();
	}
	catch(err)
	{
		if (err.name === 'ValidationError')
		{
        	return res.status(400).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}

	// leftover boilerplate
  //res.json({users: [{name: 'Timmy'}]});
});

/* updates the person prefs by uid for quick report regeneration */
router.put('/:id', async (req, res, next) =>
{
	try
	{
		const person = await PersonService.update(req.params.id, req.body);

		return res.json({ person: person });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* ultimatrly safeguard the persons transmission of prefs */
router.delete('/:id', async (req, res, next) =>
{
	try
	{
		const person = await PersonService.delete(req.params.id);

		return res.json({success: true});
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

module.exports = router;
