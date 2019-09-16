var express = require('express');
var router = express.Router();
var PersonService = require('../services/person');

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

		if(body.guid != null)
		{
			person.guid = body.guid;
		}

		res.cookie('guid', person.guid, { maxAge: 900000, httpOnly: true });

		// recreate the person!
		return res.status(201).json({ person: person });

		// TODO: use these values here with js-xlsx to beautifully gen and DL the report
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
