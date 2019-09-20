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
		var data = [
			['Categories', 'Label  ', 'Value'],
			["HR/PII", "First Name", "Paul"],
			["      ", "Middle Name", "Edwin"],
			["      ", "Last Name", "Yeager"],
			["      ", "EMail", "pyeager@firstrepublic.com"],
											 //["      ", "Phone", "252-235-8335"],
											 //["      ", "Zipcode", "94930"],
											 //["      ", "Code Of the Day", "1234"],
											 //["      ", "Social Media URL", "https://github.com/violinmoksha"],
											 //["      ", "Social Security Number", "123-45-6789"],
											 //["      ", "Driver License Number", "123456789"],
											 //["      ", "Passport Number", "123456789"],
											 //["      ", "Passport Nation", "USA"],
											 //["      ", "Age", "38"],
											 //["      ", "Other Names Used in the Past", "NA"],
				["Health/PHI", "Medical Diagnosis", "Active Worker"],
				["      ", "Medical Prescription", "CoQ10 and Lecithin"],
				["      ", "Blood Group", "O-Positive"],
											 //["      ", "In the Know", "TRUE"],
											 //["      ", "Compliant Patient", "TRUE"],
											 //["      ", "Government Food Subsistence", "FALSE"],
				["FinTech/PCI", "Non-PCI Protected Account", "123456-abcdefg"],
				["      ", "Non-PCI Protected Security Code", "123"]
		];

		// scrub it from the query params for all xls generation potentials
		var hrItemCt = 5, healthItemCt = 4;
		if (req.query.first_nameL == 'false') {
			for(var k = 0; k < data.length; k++){
    		if(data[k][1] == "First Name" && data[k][2] == "Paul"){
					data.splice(k, 1);
					var first_nameLWasFalse = true;
					hrItemCt--;
				}
    	}
		}
		if (req.query.first_nameV == 'false' && !first_nameLWasFalse) {
			for(var k = 0; k < data.length; k++){
    		if(data[k][1] == "First Name" && data[k][2] == "Paul"){
					data[k][2] = '<redacted>';
				}
    	}
		}
		if (req.query.middle_nameL == 'false') {
			for(var k = 0; k < data.length; k++){
    		if(data[k][1] == "Middle Name" && data[k][2] == "Edwin"){
					data.splice(k, 1);
					var middle_nameLWasFalse = true;
					hrItemCt--;
				}
    	}
		}
		if (req.query.middle_nameV == 'false' && !middle_nameLWasFalse) {
			for(var k = 0; k < data.length; k++){
    		if(data[k][1] == "Middle Name" && data[k][2] == "Edwin"){
					data[k][2] = '<redacted>';
				}
    	}
		}
		if (req.query.last_nameL == 'false') {
			for(var k = 0; k < data.length; k++){
    		if(data[k][1] == "Last Name" && data[k][2] == "Yeager"){
					data.splice(k, 1);
					var last_nameLWasFalse = true;
					hrItemCt--;
				}
    	}
		}
		if (req.query.last_nameV == 'false' && !last_nameLWasFalse) {
			for(var k = 0; k < data.length; k++){
    		if(data[k][1] == "Last Name" && data[k][2] == "Yeager"){
					data[k][2] = '<redacted>';
				}
    	}
		}
		if (req.query.emailL == 'false') {
			for(var k = 0; k < data.length; k++){
    		if(data[k][1] == "EMail" && data[k][2] == "pyeager@firstrepublic.com"){
					data.splice(k, 1);
					var emailLWasFalse = true;
					hrItemCt--;
				}
    	}
		}
		if (req.query.emailV == 'false' && !emailLWasFalse) {
			for(var k = 0; k < data.length; k++){
    		if(data[k][1] == "EMail" && data[k][2] == "pyeager@firstrepublic.com"){
					data[k][2] = '<redacted>';
				}
    	}
		}
		if (first_nameLWasFalse && middle_nameLWasFalse && last_nameLWasFalse && emailLWasFalse) {} else {
			data[1][0] = "HR/PII";
		}
		if (req.query.dxL == 'false') {
			for(var k = 0; k < data.length; k++){
    		if(data[k][1] == "Medical Diagnosis" && data[k][2] == "Active Worker"){
					data.splice(k, 1);
					var dxLWasFalse = true;
					healthItemCt--;
				}
    	}
		}
		if (req.query.dxV == 'false' && !dxLWasFalse) {
			for(var k = 0; k < data.length; k++){
    		if(data[k][1] == "Medical Diagnosis" && data[k][2] == "Active Worker"){
					data[k][2] = '<redacted>';
				}
    	}
		}
		if (req.query.rxL == 'false') {
			for(var k = 0; k < data.length; k++){
    		if(data[k][1] == "Medical Prescription" && data[k][2] == "CoQ10 and Lecithin"){
					data.splice(k, 1);
					var rxLWasFalse = true;
					healthItemCt--;
				}
    	}
		}
		if (req.query.rxV == 'false' && !rxLWasFalse) {
			for(var k = 0; k < data.length; k++){
    		if(data[k][1] == "Medical Prescription" && data[k][2] == "CoQ10 and Lecithin"){
					data[k][2] = '<redacted>';
				}
    	}
		}
		if (req.query.bloodGrpL == 'false') {
			for(var k = 0; k < data.length; k++){
    		if(data[k][1] == "Blood Group" && data[k][2] == "O-Positive"){
					data.splice(k, 1);
					var bloodGrpLWasFalse = true;
					healthItemCt--;
				}
    	}
		}
		if (req.query.bloodGrpV == 'false' && !bloodGrpLWasFalse) {
			for(var k = 0; k < data.length; k++){
    		if(data[k][1] == "Blood Group" && data[k][2] == "O-Positive"){
					data[k][2] = '<redacted>';
				}
    	}
		}
		if (dxLWasFalse && rxLWasFalse && bloodGrpLWasFalse) {} else {
			data[hrItemCt][0] = "Health/PHI";
		}
		if (req.query.nonPciAcctL == 'false') {
			for(var k = 0; k < data.length; k++){
    		if(data[k][1] == "Non-PCI Protected Account" && data[k][2] == "123456-abcdefg"){
					data.splice(k, 1);
					var nonPciAcctLWasFalse = true;
				}
    	}
		}
		if (req.query.nonPciAcctV == 'false' && !nonPciAcctLWasFalse) {
			for(var k = 0; k < data.length; k++){
    		if(data[k][1] == "Non-PCI Protected Account" && data[k][2] == "123456-abcdefg"){
					data[k][2] = '<redacted>';
				}
    	}
		}
		if (req.query.nonPciSecDigitzL == 'false') {
			for(var k = 0; k < data.length; k++){
    		if(data[k][1] == "Non-PCI Protected Security Code" && data[k][2] == "123"){
					data.splice(k, 1);
					var nonPciSecDigitzLWasFalse = true;
				}
    	}
		}
		if (req.query.nonPciSecDigitzV == 'false' && !nonPciSecDigitzLWasFalse) {
			for(var k = 0; k < data.length; k++){
    		if(data[k][1] == "Non-PCI Protected Security Code" && data[k][2] == "123"){
					data[k][2] = '<redacted>';
				}
    	}
		}
		if (nonPciAcctLWasFalse && nonPciSecDigitzLWasFalse) {} else {
			data[hrItemCt+healthItemCt - 1][0] = "FinTech/PCI";
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

			ws['A1'].s = {fill:{fgColor: {rgb:"FAED27"}}};
			//ws['A16'].s = ws['A2'].s;
			//ws['A22'].s = ws['A16'].s;

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
		res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
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
