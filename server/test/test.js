var supertest = require("supertest");
var chai = require('chai')
var server = require('../app');
let username = 'name' + new Date().getTime()
var agent = supertest.agent(server)



describe('test resgister', function () {
    
    it('should not register the account when passwords are not the same', function (done) {
        agent.post('/register')
            .send({
                username:'lihuaabcder',
                password:'123',
                passwordRepeat:'456'
            })
            .set('Accept', 'application/json')
            .expect(200,(err,res) =>{
                chai.expect(res.text).to.equal('111')
                done();
            })
    });

    it('should not register the account which the length of username more than 30', function(done) {
        agent.post('/register')
        .send({
            username:'hjaksdlfhalkfdhjkalhfdaklhfdkljafdhklahfklfhdjakhfdklhfklahfdkla\
            hjaksdlfhalkfdhjkalhfdaklhfdkljafdhklahfklfhdjakhfdklhfklahfdkla',
            password:'123',
            passwordRepeat:'123'
        })
        .expect(200,(err,res) =>{
            chai.expect(res.text).to.equal('222')
            done();
        })
    });

    it('should not register the account which the length of password more than 30', function(done) {
        agent.post('/register')
        .send({
            username:'ahfjklfhakldf',
            password:'hjaksdlfhalkfdhjkalhfdaklhfdkljafdhklahfklfhdjakhfdklhfklahfdkla\
            hjaksdlfhalkfdhjkalhfdaklhfdkljafdhklahfklfhdjakhfdklhfklahfdkla',
            passwordRepeat:'hjaksdlfhalkfdhjkalhfdaklhfdkljafdhklahfklfhdjakhfdklhfklahfdkla\
            hjaksdlfhalkfdhjkalhfdaklhfdkljafdhklahfklfhdjakhfdklhfklahfdkla'
        })
        .expect(200,(err,res) =>{
            chai.expect(res.text).to.equal('222')
            done();
        })
    });

    it('should not register the account with existed username', function (done) {
        agent.post('/register')
            .send({
                username:'lihuaabcder',
                password:'123',
                passwordRepeat:'123'
            })
            .expect(200,(err,res) => {
                chai.expect(res.text).to.equal('333')
                done();
            })
    });

    it('should register the account', function (done) {
        agent.post('/register')
            .send({
                username:username,
                password:'123',
                passwordRepeat:'123'
            })
            .expect(200)
            .expect(res =>{
                chai.expect(res.text).to.equal('444')
            })
            .end(done);
    });
})

describe('test login', function () {

    it('should no login the account if the password is wrong', function (done) {
        agent.post('/login')
            .send({
                username:username,
                password:'456'
            })
            .expect(200)
            .expect(res =>{
                chai.expect(res.text).to.equal('fail')
            })
            .end(done);
    });

    it('should not register the account which the length of username more than 30', function(done) {
        agent.post('/login')
        .send({
            username:'hjaksdlfhalkfdhjkalhfdaklhfdkljafdhklahfklfhdjakhfdklhfklahfdkla\
            hjaksdlfhalkfdhjkalhfdaklhfdkljafdhklahfklfhdjakhfdklhfklahfdkla',
            password:'123',
        })
        .expect(200,(err,res) =>{
            chai.expect(res.text).to.equal('overflow')
            done();
        })
    });
    
    it('should not register the account which the length of password more than 30', function(done) {
        agent.post('/login')
        .send({
            username:'username',
            password:'hjaksdlfhalkfdhjkalhfdaklhfdkljafdhklahfklfhdjakhfdklhfklahfdkla\
            hjaksdlfhalkfdhjkalhfdaklhfdkljafdhklahfklfhdjakhfdklhfklahfdkla',
            passwordRepeat:'12hjaksdlfhalkfdhjkalhfdaklhfdkljafdhklahfklfhdjakhfdklhfklahfdkla\
            hjaksdlfhalkfdhjkalhfdaklhfdkljafdhklahfklfhdjakhfdklhfklahfdkla3'
        })
        .expect(200,(err,res) =>{
            chai.expect(res.text).to.equal('overflow')
            done();
        })
    })

    it('should no login the account if the username is existed', function (done) {
        agent.post('/login')
            .send({
                username:'hajkfhakljhflkahfkljahkf',
                password:'456'
            })
            .expect(200)
            .expect(res =>{
                chai.expect(res.text).to.equal('fail')
            })
            .end(done);
    });

    it('should login the account', function (done) {
        agent.post('/login')
            .send({
                username:username,
                password:'123'
            })
            .expect(200)
            .expect(res =>{
                chai.expect(res.text).to.equal('success')
            })
            .end(done);
    });

    // it('should upload a image', function (done) {
    //     request(server)
    //         .post('/upload')
    //         .field('file','test')
    //         .attach('image','../Image/test1.png')
    //         .expect(200)
    //         .end(done)
    // });
})

describe('test function', function () {

    it('should upload an image to transform', function (done) {
        agent.post('/upload')
            .field('file','test')
            .attach('image','../Image/test1.png')
            // .expect(200)
            .expect(200,(err,res)=>{
                chai.expect(res.text).to.equal('http://localhost:3000/newpng.png')
                done();
            })
    }).timeout(1000000);

    it('should download an image', function (done) {
        agent.get('/download')
            .expect(200, (err,res)=>{
                smilefile = res.text
                done();
            });
    });

    it('should predict the toxicity', done => {
        agent.post('/prediction')
            .send({
                smile: smilefile
            }).set('Accept', 'application/json')
            .expect(200)
            .end(done);
    }).timeout(1000000);
})

after(function(){
    server.close();
});