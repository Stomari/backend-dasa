const express = require('express');
const mongoose = require('mongoose');
const Laboratory = require('../models/Laboratory');
const Exam = require('../models/Exam');

const router = express.Router();

/* GET all active laboratories. */
router.get('/laboratory', (req, res) => {
  Laboratory.find({ status: 'ativo' })
    .populate('activeExams')
    .then((labs) => res.json(labs))
    .catch((error) => res.json(error));
});

/* GET all laboratories associated with an exam. */
router.get('/laboratory/:examName', (req, res) => {
  let { examName } = req.params;
  if (examName.includes('-')) {
    examName = examName.split('-').join(' ');
  }
  Exam.findOne({ name: examName })
    .then((response) => {
      Laboratory.find({ activeExams: response.id })
        .then((labs) => res.json(labs))
        .catch((error) => res.json(error));
    })
    .catch((error) => res.json(error));
});

/* POST create a new laboratory. */
router.post('/create/laboratory', (req, res) => {
  const { name, address } = req.body;

  const newLaboratory = new Laboratory({
    name,
    address,
  });

  newLaboratory.save()
    .then((response) => res.json({ message: `${response.name} created!` }))
    .catch((error) => res.json(error));
});

/* PUT edit an existing laboratory. */
router.put('/edit/laboratory/:laboratoryID', (req, res) => {
  const { laboratoryID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(laboratoryID)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const { name, address, status } = req.body;

  if (!name || !address || !status) {
    res.status(400).json({ message: 'Missing information, please verify if all fields were filled' });
    return;
  }

  Laboratory.findByIdAndUpdate(laboratoryID, { $set: { name, address, status } })
    .then(() => res.json({ message: `Laboratory with ID ${laboratoryID} updated successfully.` }))
    .catch((error) => res.json(error));
});

/* DELETE an active laboratory. */
router.delete('/delete/laboratory/:laboratoryID', (req, res) => {
  const { laboratoryID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(laboratoryID)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Laboratory.findById(laboratoryID)
    .then((lab) => {
      if (lab.status === 'ativo') {
        Laboratory.findByIdAndDelete(laboratoryID)
          .then(() => res.json({ message: `Laboratory with ID ${laboratoryID} deleted successfully.` }))
          .catch((error) => res.json(error));
      } else {
        res.json({ message: `Laboratory with ID ${laboratoryID} is not active.` });
      }
    })
    .catch((error) => res.json(error));
});

/* PUT add an active exam to an active laboratory. */
router.put('/add/:examID/to-lab/:laboratoryID', (req, res) => {
  const { laboratoryID, examID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(laboratoryID) || !mongoose.Types.ObjectId.isValid(examID)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Laboratory.findById(laboratoryID)
    .then((lab) => {
      if (!lab.activeExams.includes(examID)) {
        Laboratory.findByIdAndUpdate(laboratoryID, { $push: { activeExams: examID } })
          .then(() => res.json({ message: 'Exam added successfully.' }))
          .catch((error) => res.json(error));
      } else {
        res.json({ message: 'Exam already added to this laboratory' });
      }
    })
    .catch((error) => res.json(error));
});

/* PUT remove an active exam of an active laboratory. */
router.put('/remove/:examID/from-lab/:laboratoryID', (req, res) => {
  const { laboratoryID, examID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(laboratoryID) || !mongoose.Types.ObjectId.isValid(examID)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Laboratory.findByIdAndUpdate(laboratoryID, { $pull: { activeExams: examID } })
    .then(() => res.json({ message: 'Exam removed successfully.' }))
    .catch((error) => res.json(error));
});

module.exports = router;
