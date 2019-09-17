/* require XLSX */
var XLSX = require('js-xlsx');

/* original data */
var filename = "privacy-report.xlsx";
var data = [['                  ', '                                    ', 'HRLabel  ', 'HRValue', 'HealthLabel       ', 'HealthValue', 'FinTechLabel            ', 'FinTechValue'],
            ["Globally Unique ID", "d66e57bc-6b90-4715", "FirstName ", "<Paul>",  "ActiveWorkerStatus", "<TRUE>",      "PCI-Protected Account ID", "<123456>    "],
            ["                  ", "                  ", "LastName  ", "<Non-NULL>", "BloodGroup", "<O-Negative>", "PCI-Protected CSC", "<Non-NULL>"],
            ["                  ", "                  ", "<Non-NULL>", "pyeager@firstrepublic.com", "DX/Diagnosis", "<Non-NULL>", "<Non-NULL>", "<Non-NULL>"]
];
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
  var wscols = [
    {wch:20},
    {wch:20},
    {wch:20},
    {wch:30},
    {wch:20},
    {wch:20},
    {wch:20},
    {wch:15}
  ];

  ws['!cols'] = wscols;

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
XLSX.writeFile(wb, filename);
