var app = require('../../app.js'),
		request = require('supertest');



describe('Site routes', function(){

	it('Should respond 200 for root', function(done){
		request(app)
		.get('/')
		.expect(200)
		.end(done)
	})
})


