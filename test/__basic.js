const server = require('../server');
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');

// plugin for http tests
chai.use(chaiHttp);

// test for 200 status on index page
describe('/index', () => {
	it('should respond with 200 status', (done) => {
		chai.request('http://localhost:3000')
		.get('/')
		.end((err,res) => {
			expect(res).to.have.status(200);
			done();
		});
	});
});