/*global  describe:true*/
/*eslint func-style: ["error", "declaration", { "allowArrowFunctions": true }]*/
/*global  it:true*/
/*eslint no-undef: "error"*/

const index = require('../index');
const chai = require('chai');
const request = require('supertest');
const expect = chai.expect;



describe('API Endpoints', function() {

	let entry = {id:1, title: 'My world cup experience', note:'It was awesome'};


	//GET all entries
	describe('#GET / entries', function() {
		it('should fetch all entries', function(done) {
			request(index) .get('/api/v1/entries')
				.end(function(err, res) {
					//expect(res).to.have.status(200);
					expect(res.body).to.be.an('object');
					expect(res.body.entry).to.be.an('array');
					done();
				});
		});
	});


	//POST : Returns error message
	describe('## Create task ', () => {
		it('should return error message (400):Bad request', (done) =>{
			request(index) .post('/api/v1/entries') .send(entry) .end((err, res) =>{
				expect(res.statusCode).to.equal(400);
				entry != res.body;
				done();
			});
		});

		//POST : creates an entry
		it('should create an entry if the entries are valid', (done)=> {
			request(index) .post('/api/v1/entries') .send(entry) .end( (err, res) => {
				expect(res.body[0]).to.deep.equal(entry);
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('id');
				expect(res.body).to.have.property('title');
				expect(res.body).to.have.property('note');
				expect(res.body.id).to.be.a('number');
				expect(res.body.title).to.be.a('string');
				expect(res.body.note).to.be.a('string');
				expect(res.body.id).to.equal(1);
				expect(res.body.title).to.equal('My world cup experience');
				entry.id = res.body.id;
				expect(res.body.note).to.equal('It was awesome');

				done();
			});

		});

	});

	//GET: fetches a single entry
	describe('GET an entry by ID', () => {

		it('should return 404 if an entry is not found', (done)=> {
			request(index) .get('/api/v1/entries' + entry.id) .end( (err, res) => {
				expect(res.statusCode).to.equal(404);
				done();
			});
		});

		it('should fetch an entry', (done) => {
			request(index) .get('/api/v1/entries' + entry.id) .end((err, res) => {
				expect(res.body).to.be.a('object');
				done();
			});
		});
	});


	//DELETE - removes a single entry
	describe('DELETE removes an entry', ()=> {
		it(' should return 404 if entry is not found', (done)=> {
			let entryId = entry[0].id;
			request(index)
				.delete('/api/v1/entries' + entryId)
				.end((err, res) =>{
					expect(res.statusCode).to.equal(404);
					done();
				});
		});

		it('should fetch an entry', (done)=> {
			request(index) .delete('/api/v1/entries' + entry.id).end((err, res) => {
				expect(res.body).to.be.a('object');
				done();
			});
		});

	});


	//PUT -modifies an entry
	describe('PUT modifies an entry',()=>{
		it('should return 404 if entry is not found',(done) =>{
			request(index).put('/api/v1/entries' + entry.id).end((err,res)=>{

				expect(res.statusCode).to.equal(404);
				done();
			});
		});

		it('should update an entry',(done) =>{
			request(index).put('/api/v1/entries' + entry.id).end((err,res)=>{
				(res.body);
				done();
			});
		});
	});


});
