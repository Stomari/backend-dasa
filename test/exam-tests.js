const request = require('supertest');
const chai = require('chai');
const mongoose = require('mongoose');
const app = require('../app');
const Exam = require('../models/Exam');

const { expect } = chai;

before((done) => {
  mongoose
    .connect('mongodb://localhost/test', { useNewUrlParser: true })
    .then((db) => {
      console.log(`Connected to Mongo! Database name: "${db.connections[0].name}"`);
      Exam.collection.remove()
        .then(() => {
          const newExam = new Exam({
            name: 'Exam',
            type: 'imagem',
            status: 'ativo',
          });

          newExam.save()
            .then(() => done())
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    })
    .catch((err) => {
      console.error('Error connecting to mongo', err);
    });
});

describe('Exam routes', () => {
  describe('GET /exam', () => {
    it('should return all active exams', (done) => {
      request(app).get('/api/exam')
        .end((err, res) => {
          if (err) throw err;
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal('Exam');
          expect(res.body[0].type).to.be.equal('imagem');
          expect(res.body[0].status).to.be.equal('ativo');
          done();
        });
    });
  });

  describe('POST /create/exam', () => {
    it('should create an exam', (done) => {
      request(app).post('/api/create/exam')
        .send({ name: 'Exam2', type: 'analise clinica' })
        .end((err, res) => {
          if (err) throw err;
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.be.equal('Exam2 created!');
          done();
        });
    });
  });

  describe('PUT /edit/exam/:examID', () => {
    it('should edit specified exam', (done) => {
      Exam.findOne({ name: 'Exam' })
        .then((exam) => {
          request(app).put(`/api/edit/exam/${exam.id}`)
            .send({ name: 'ExamEdited', type: 'analise clinica', status: 'inativo' })
            .end((err, res) => {
              if (err) throw err;
              expect(res.status).to.equal(200);
              expect(res.body).to.be.an('object');
              expect(res.body.message).to.be.equal(`Exam with ID ${exam.id} updated successfully.`);
              done();
            });
        })
        .catch((error) => console.log(error));
    });
  });

  describe('DELETE /delete/exam/:examID', () => {
    it('should delete specified exam', (done) => {
      Exam.findOne({ name: 'Exam2' })
        .then((exam) => {
          request(app).delete(`/api/delete/exam/${exam.id}`)
            .end((err, res) => {
              if (err) throw err;
              expect(res.status).to.equal(200);
              expect(res.body).to.be.an('object');
              expect(res.body.message).to.be.equal(`Exam with ID ${exam.id} deleted successfully.`);
              done();
            });
        })
        .catch((error) => console.log(error));
    });
  });
});
