
const Joi = require('joi');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();



app.use(express.json());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
	res.setHeader('cache-control', 'private,max-age=0,no-cache, no-store, must-revalidate');
	res.setHeader('expires', '0');
	res.setHeader('pragma', 'no-cache');
	next();
});

//An array holding the lists of entries
const entries = [
	{id:1, title: 'My world cup experience', note:'It was awesome'},
	{id:2, title: 'My first Endpoint set up', note:'It was so engaging'},
	{id:3, title: 'My Hobbies', note:'They are swimming, reading, singing, programming'},
	{id:4, title: 'My first day onboard aircraft',  note:'It was a bit frightening'},
	{id:5, title: 'My Todo list today',  note:'Keyboard rehearsals, create endpoints, write some codes'},
	{id:6, title: 'My best gadgets',  note:'Android phone, Laptop, smart wrist watch,laptop'},
];




//Fetch the index page
app.get('/', (req,res) => {
	res.send('Welcome to my new Diary Endpoints');
});


//Fetch all entries
app.get('/api/v1/entries', (req, res) =>{
	res.send(entries);
});


//Fetch a single entry
app.get('/api/v1/entries/:id', (req, res) => {
	const entry = entries.find(c => c.id === parseInt(req.params.id) );
	if(!entry) res.status(404).send('The entry with the given ID was not found');
	res.send(entry);
});


//Create a single entry
app.post('/api/v1/entries', (req,res) => {

	const {error} = validateEntries(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	const entry = {
		id:entries.length + 1,
		title:req.body.title,
		note:req.body.note
	};
	entries.push(entry);
	res.send(entry);

});


//Modify a single entry
app.put('/api/v1/entries/:id', (req,res) =>{
	const entry = entries.find(c => c.id === parseInt(req.params.id) );
	if(!entry){ res.status(404).send('The course with the given ID was not found');
		return;
	}
	else{
		const {error} = validateEntries(req.body);
		if(error) return res.status(400).send(error.details[0].message);
		entry.title = req.body.title;
		entry.note = req.body.note;
		res.send(entry);
	}

});

//Delete a single entry
app.delete('/api/v1/entries/:id', (req,res) =>{
	const entry = entries.find(c => c.id === parseInt(req.params.id) );
	if(!entry) res.status(404).send('The entry with the given ID was not found');

	const targetIndex = entries.indexOf(entry);
	entries.splice(targetIndex, 1);

	res.send(entry);
});

//Validation function
function validateEntries(entry){
	const schema = {

		title:Joi.string().min(3).required(),
		note:Joi.string().min(3).required()
	};
	return Joi.validate(entry, schema);
}

//Sever port
const port = process.env.PORT || 3000;
app.listen(port, () => (`Listening on port ${port}...`));
module.exports = app;
