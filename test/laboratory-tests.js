const request = require('supertest');
const chai = require('chai');
const mongoose = require('mongoose');
const app = require('../app');
const Laboratory = require('../models/Laboratory');
const Exam = require('../models/Exam');

const { expect } = chai;

before((done) => {
  mongoose
    .connect('mongodb://localhost/test', { useNewUrlParser: true })
    .then((db) => {
      console.log(`Connected to Mongo! Database name: "${db.connections[0].name}"`);
      Laboratory.collection.remove()
        .then(() => {
          const newLaboratory = new Laboratory({
            name: 'Lab',
            address: 'Street',
            status: 'ativo',
          });

          newLaboratory.save()
            .then(() => done())
            .catch((error) => console.log(error));

        })
        .catch((error) => console.log(error));
    })
    .catch((err) => {
      console.error('Error connecting to mongo', err);
    });
});

describe('Laboratory routes', () => {
  describe('GET /laboratory', () => {
    it('should return all active laboratories', (done) => {
      request(app).get('/api/laboratory')
        .end((err, res) => {
          if (err) throw err;
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal('Lab');
          expect(res.body[0].address).to.be.equal('Street');
          expect(res.body[0].status).to.be.equal('ativo');
          done();
        });
    });
  });

  describe('POST /create/laboratory', () => {
    it('should create a laboratory', (done) => {
      request(app).post('/api/create/laboratory')
        .send({ name: 'Lab2', address: 'Street2' })
        .end((err, res) => {
          if (err) throw err;
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.be.equal('Lab2 created!');
          done();
        });
    });
  });

  describe('PUT /edit/laboratory/:laboratoryID', () => {
    it('should edit specified laboratory', (done) => {
      Laboratory.findOne({ name: 'Lab' })
        .then((lab) => {
          request(app).put(`/api/edit/laboratory/${lab.id}`)
            .send({ name: 'LabEdited', address: 'StreetEdited', status: 'inativo' })
            .end((err, res) => {
              if (err) throw err;
              expect(res.status).to.equal(200);
              expect(res.body).to.be.an('object');
              expect(res.body.message).to.be.equal(`Laboratory with ID ${lab.id} updated successfully.`);
              done();
            });
        })
        .catch((error) => console.log(error));
    });
  });

  describe('DELETE /delete/laboratory/:laboratoryID', () => {
    it('should delete specified laboratory', (done) => {
      Laboratory.findOne({ name: 'Lab2' })
        .then((lab) => {
          request(app).delete(`/api/delete/laboratory/${lab.id}`)
            .end((err, res) => {
              if (err) throw err;
              expect(res.status).to.equal(200);
              expect(res.body).to.be.an('object');
              expect(res.body.message).to.be.equal(`Laboratory with ID ${lab.id} deleted successfully.`);
              done();
            });
        })
        .catch((error) => console.log(error));
    });
  });
});
