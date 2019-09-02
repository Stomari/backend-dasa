const express = require('express');
const mongoose = require('mongoose');
const Exam = require('../models/Exam');

const router = express.Router();

/* GET all active exams. */
router.get('/exam', (req, res) => {
  Exam.find({ status: 'ativo' })
    .then((exams) => res.json(exams))
    .catch((error) => res.json(error));
});

/* POST create a new exam. */
router.post('/create/exam', (req, res) => {
  const { name, type } = req.body;

  const newExam = new Exam({
    name,
    type,
  });

  newExam.save()
    .then((response) => res.json({ message: `${response.name} created!` }))
    .catch((error) => res.json(error));
});

/* PUT edit an existing exam. */
router.put('/edit/exam/:examID', (req, res) => {
  const { examID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(examID)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const { name, type, status } = req.body;

  if (!name || !type || !status) {
    res.status(400).json({ message: 'Missing information, please verify if all fields were filled' });
    return;
  }

  Exam.findByIdAndUpdate(examID, { $set: { name, type, status } })
    .then(() => res.json({ message: `Exam with ID ${examID} updated successfully.` }))
    .catch((error) => res.json(error));
});

/* DELETE an active exam. */
router.delete('/delete/exam/:examID', (req, res) => {
  const { examID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(examID)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Exam.findById(examID)
    .then((lab) => {
      if (lab.status === 'ativo') {
        Exam.findByIdAndDelete(examID)
          .then(() => res.json({ message: `Exam with ID ${examID} deleted successfully.` }))
          .catch((error) => res.json(error));
      } else {
        res.json({ message: `Exam with ID ${examID} is not active.` });
      }
    })
    .catch((error) => res.json(error));
});

module.exports = router;
