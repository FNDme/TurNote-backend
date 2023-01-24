import exp from 'constants';
import 'mocha';
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:8080';

describe('Server', () => {
  it('\'/\' should return 200', (done) => {
    chai.request(url)
      .get('/')
      .end( function(err: any, res: any) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Welcome to application.');
        done();
      });
  });
});

let user = {
  username: 'testUsername',
  name: 'testName',
  email: 'testing@testing.com',
  password: 'passwordtest',
  token: ''
};

describe('Auth', () => {

  it('\'/api/auth/signup\' should create an account', (done) => {
    chai.request(url)
      .post('/api/auth/signup')
      .send({
        username: user.username,
        name: user.name,
        email: user.email,
        password: user.password
      })
      .end( function(err: any, res: any) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('User was registered successfully!');
        done();
      });
  });

  it('\'/api/auth/signout\' should sign out', (done) => {
    chai.request(url)
      .get('/api/auth/signout')
      .end( function(err: any, res: any) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Signout successfully!');
        done();
      });
  });

  it('\'/api/auth/signin\' should sign in', (done) => {
    chai.request(url)
      .post('/api/auth/signin')
      .send({
        username: user.username,
        password: user.password
      })
      .end( function(err: any, res: any) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('username');
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('token');
        user.token = res.body.token;
        done();
      });
  });

  it('\'/api/auth/removeAccount\' should remove an account', (done) => {
    chai.request(url)
      .delete('/api/auth/removeAccount')
      .set('token', user.token)
      .end( function(err: any, res: any) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('User was deleted successfully!');
        done();
      });
  });
});

describe('Notes', () => {
  before( (done) => {
    chai.request(url)
      .post('/api/auth/signup')
      .send({
        username: user.username,
        name: user.name,
        email: user.email,
        password: user.password
      })
      .end( function(err: any, res: any) {
        chai.request(url)
          .post('/api/auth/signin')
          .send({
            username: user.username,
            password: user.password
          })
          .end( function(err: any, res: any) {
            user.token = res.body.token;
            done();
          });
      });
  });

  after( (done) => {
    chai.request(url)
      .delete('/api/auth/removeAccount')
      .set('token', user.token)
      .end( function(err: any, res: any) {
        done();
      });
  });

  it('\'/api/notes/public\' should return public notes', (done) => {
    chai.request(url)
      .get('/api/notes/public')
      .end( function(err: any, res: any) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].isPublic).to.equal(true);
        done();
      });
  });

  it('\'/api/user/notes\' should return user notes', (done) => {
    chai.request(url)
      .post('/api/notes')
      .set('token', user.token)
      .send({
        title: 'testTitle',
        content: 'testContent',
        isPublic: false
      })
      .end( function(err: any, res: any) {
        chai.request(url)
          .get('/api/user/notes')
          .set('token', user.token)
          .end( function(err: any, res: any) {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            let checkFlag = false;
            let noteId = '';
            res.body.forEach( (note: any) => {
              if (note.title === 'testTitle' && note.content === 'testContent' && note.isPublic === false) {
                checkFlag = true;
                noteId = note._id;
              }
            });
            expect(checkFlag).to.equal(true);
            chai.request(url)
              .delete('/api/notes/' + noteId)
              .set('token', user.token)
              .end( function(err: any, res: any) {
                done();
              });
          });
      });
  });

  it('\'/api/notes\' should return all notes (public and user)', (done) => {
    chai.request(url)
      .post('/api/notes')
      .set('token', user.token)
      .send({
        title: 'testTitle',
        content: 'testContent',
        isPublic: false
      })
      .end( function(err: any, res: any) {
        chai.request(url)
          .get('/api/notes')
          .set('token', user.token)
          .end( function(err: any, res: any) {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            let checkFlag = false;
            let checkPublicFlag = false;
            let noteId = '';
            res.body.forEach( (note: any) => {
              if (note.isPublic === true) {
                checkPublicFlag = true;
              }
              if (note.title === 'testTitle' && note.content === 'testContent' && note.isPublic === false) {
                checkFlag = true;
                noteId = note._id;
              }
            });
            expect(checkPublicFlag).to.equal(true);
            expect(checkFlag).to.equal(true);
            chai.request(url)
              .delete('/api/notes/' + noteId)
              .set('token', user.token)
              .end( function(err: any, res: any) {
                done();
              });
          });
      });
  });

  it('\'/api/notes\' should create a note', (done) => {
    chai.request(url)
      .post('/api/notes')
      .set('token', user.token)
      .send({
        title: 'testTitle',
        content: 'testContent',
        isPublic: false
      })
      .end( function(err: any, res: any) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('content');
        expect(res.body).to.have.property('isPublic');
        expect(res.body.title).to.equal('testTitle');
        expect(res.body.content).to.equal('testContent');
        expect(res.body.isPublic).to.equal(false);
        chai.request(url)
          .delete('/api/notes/' + res.body._id)
          .set('token', user.token)
          .end( function(err: any, res: any) {
            done();
          });
      });
  });

  it('\'/api/notes/:id\' should return a note', (done) => {
    chai.request(url)
      .post('/api/notes')
      .set('token', user.token)
      .send({
        title: 'testTitle',
        content: 'testContent',
        isPublic: false
      })
      .end( function(err: any, res: any) {
        chai.request(url)
          .get('/api/notes/' + res.body._id)
          .set('token', user.token)
          .end( function(err: any, res: any) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('title');
            expect(res.body).to.have.property('content');
            expect(res.body).to.have.property('isPublic');
            expect(res.body.title).to.equal('testTitle');
            expect(res.body.content).to.equal('testContent');
            expect(res.body.isPublic).to.equal(false);
            chai.request(url)
              .delete('/api/notes/' + res.body._id)
              .set('token', user.token)
              .end( function(err: any, res: any) {
                done();
              });
          });
      });
  });

  it('\'/api/notes/public/:id\' should return a public note', (done) => {
    chai.request(url)
      .post('/api/notes')
      .set('token', user.token)
      .send({
        title: 'testTitle',
        content: 'testContent',
        isPublic: true
      })
      .end( function(err: any, res: any) {
        chai.request(url)
          .get('/api/notes/public/' + res.body._id)
          .end( function(err: any, res: any) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('title');
            expect(res.body).to.have.property('content');
            expect(res.body).to.have.property('isPublic');
            expect(res.body.title).to.equal('testTitle');
            expect(res.body.content).to.equal('testContent');
            expect(res.body.isPublic).to.equal(true);
            chai.request(url)
              .delete('/api/notes/' + res.body._id)
              .set('token', user.token)
              .end( function(err: any, res: any) {
                done();
              });
          });
      });
  });

  it('\'/api/notes/:id\' should update a note', (done) => {
    let noteId = '';
    chai.request(url)
      .post('/api/notes')
      .set('token', user.token)
      .send({
        title: 'testTitle',
        content: 'testContent',
        isPublic: false
      })
      .end( function(err: any, res: any) {
        noteId = res.body._id;
        chai.request(url)
          .put('/api/notes/' + res.body._id)
          .set('token', user.token)
          .send({
            title: 'testTitle2',
            content: 'testContent2',
            isPublic: true
          })
          .end( function(err: any, res: any) {
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal('Note was updated successfully.');
            chai.request(url)
              .delete('/api/notes/' + noteId)
              .set('token', user.token)
              .end( function(err: any, res: any) {
                done();
              });
          });
      });
  });

  it('\'/api/notes/:id\' should delete a note', (done) => {
    chai.request(url)
      .post('/api/notes')
      .set('token', user.token)
      .send({
        title: 'testTitle',
        content: 'testContent',
        isPublic: false
      })
      .end( function(err: any, res: any) {
        chai.request(url)
          .delete('/api/notes/' + res.body._id)
          .set('token', user.token)
          .end( function(err: any, res: any) {
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal('Note was deleted successfully!');
            done();
          });
      });
  });

  it('\'/api/notes/tags/public/:tag\' should return public notes with a tag', (done) => {
    chai.request(url)
      .post('/api/notes')
      .set('token', user.token)
      .send({
        title: 'testTitle',
        content: 'testContent',
        isPublic: true,
        tags: ['testTag']
      })
      .end( function(err: any, res: any) {
        chai.request(url)
          .get('/api/notes/tags/public/testTag')
          .end( function(err: any, res: any) {
            expect(res).to.have.status(200);
            let noteId = '';
            res.body.forEach( (note: any) => {
              if (note.title === 'testTitle' && note.content === 'testContent' && note.isPublic === true && note.tags.length === 1) {
                noteId = note._id;
              }
            });
            expect(noteId).to.not.equal('');
            chai.request(url)
              .delete('/api/notes/' + noteId)
              .set('token', user.token)
              .end( function(err: any, res: any) {
                done();
              });
          });
      });
  });

  it('\'/api/notes/:id/tag\' should add a tag to a note', (done) => {
    let noteId = '';
    chai.request(url)
      .post('/api/notes')
      .set('token', user.token)
      .send({
        title: 'testTitle',
        content: 'testContent',
        isPublic: false
      })
      .end( function(err: any, res: any) {
        noteId = res.body._id;
        chai.request(url)
          .post('/api/notes/' + noteId + '/tag')
          .set('token', user.token)
          .send({
            tag: 'testTag'
          })
          .end( function(err: any, res: any) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('tags');
            expect(res.body.tags.length).to.equal(1);
            expect(res.body.tags[0]).to.equal('testTag');
            chai.request(url)
              .delete('/api/notes/' + noteId)
              .set('token', user.token)
              .end( function(err: any, res: any) {
                done();
              });
          });
      });
  });

  it('\'/api/notes/:id/tag\' should remove a tag from a note', (done) => {
    let noteId = '';
    chai.request(url)
      .post('/api/notes')
      .set('token', user.token)
      .send({
        title: 'testTitle',
        content: 'testContent',
        isPublic: false,
        tags: ['testTag']
      })
      .end( function(err: any, res: any) {
        noteId = res.body._id;
        chai.request(url)
          .delete('/api/notes/' + noteId + '/tag')
          .set('token', user.token)
          .send({
            tag: 'testTag'
          })
          .end( function(err: any, res: any) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('tags');
            expect(res.body.tags.length).to.equal(0);
            chai.request(url)
              .delete('/api/notes/' + noteId)
              .set('token', user.token)
              .end( function(err: any, res: any) {
                done();
              });
          });
      });
  });
});

describe('Board', () => {
  before( (done) => {
    chai.request(url)
      .post('/api/auth/signup')
      .send({
        username: user.username,
        name: user.name,
        email: user.email,
        password: user.password
      })
      .end( function(err: any, res: any) {
        chai.request(url)
          .post('/api/auth/signin')
          .send({
            username: user.username,
            password: user.password
          })
          .end( function(err: any, res: any) {
            user.token = res.body.token;
            done();
          });
      });
  });

  after( (done) => {
    chai.request(url)
      .delete('/api/auth/removeAccount')
      .set('token', user.token)
      .end( function(err: any, res: any) {
        done();
      });
  });

  it('\'/api/board/all\' should return all public notes', (done) => {
    chai.request(url)
      .get('/api/board/all')
      .end( function(err: any, res: any) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        res.body.forEach( (note: any) => {
          expect(note).to.have.property('isPublic');
          expect(note.isPublic).to.equal(true);
        });
        done();
      });
  });

  it('\'/api/board/user\' should return all public and private notes of the user', (done) => {
    let noteId0 = '';
    let noteId1 = '';
    chai.request(url)
      .post('/api/notes')
      .set('token', user.token)
      .send({
        title: 'testTitle',
        content: 'testContent',
        isPublic: false
      })
      .end( function(err: any, res: any) {
        noteId0 = res.body._id;
        chai.request(url)
          .post('/api/notes')
          .set('token', user.token)
          .send({
            title: 'testTitle',
            content: 'testContent',
            isPublic: true
          })
          .end( function(err: any, res: any) {
            noteId1 = res.body._id;
            chai.request(url)
              .get('/api/board/user')
              .set('token', user.token)
              .end( function(err: any, res: any) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                res.body.forEach( (note: any) => {
                  expect(note.title).to.equal('testTitle');
                });
                chai.request(url)
                  .delete('/api/notes/' + noteId0)
                  .set('token', user.token)
                  .end( function(err: any, res: any) {
                    chai.request(url)
                      .delete('/api/notes/' + noteId1)
                      .set('token', user.token)
                      .end( function(err: any, res: any) {
                        done();
                      });
                  });
              });
          });
      });
  });
});