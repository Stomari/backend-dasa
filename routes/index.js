const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({
    active_laboratories_url: 'http://localhost:3000/api/laboratory',
    laboratories_with_specific_exam_url: 'http://localhost:3000/api/laboratory/{exam_name}',
    create_laboratory_url: 'http://localhost:3000/api/create/laboratory',
    edit_laboratory_url: 'http://localhost:3000/api/edit/laboratory/{laboratory_id}',
    delete_laboratory_url: 'http://localhost:3000/api/delete/laboratory/{laboratory_id}',
    add_exam_to_laboratory_url: 'http://localhost:3000/api/add/{exam_id}/to-lab/{laboratory_id}',
    remove_exam_from_laboratory_url: 'http://localhost:3000/api/remove/{exam_id}/from-lab/{laboratory_id}',
    active_exams_url: 'http://localhost:3000/api/exam',
    create_exam_url: 'http://localhost:3000/api/create/exam',
    edit_exam_url: 'http://localhost:3000/api/edit/exam/{exam_id}',
    delete_exam_url: 'http://localhost:3000/api/delete/exam/{exam_id}',
  });
});

module.exports = router;
