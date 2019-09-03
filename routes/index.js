const express = require('express');

const router = express.Router();

/* GET instructions. */
router.get('/', (req, res) => {
  res.json({
    if_testing_deployed: {
      show_active_laboratories_url: 'https://dasa-backend.herokuapp.com/api/laboratory',
      show_laboratories_with_specific_exam_url: 'https://dasa-backend.herokuapp.com/api/laboratory/{exam_name}',
      create_laboratory_url: 'https://dasa-backend.herokuapp.com/api/create/laboratory',
      edit_laboratory_url: 'https://dasa-backend.herokuapp.com/api/edit/laboratory/{laboratory_id}',
      delete_laboratory_url: 'https://dasa-backend.herokuapp.com/api/delete/laboratory/{laboratory_id}',
      add_exam_to_laboratory_url: 'https://dasa-backend.herokuapp.com/api/add/{exam_id}/to-lab/{laboratory_id}',
      remove_exam_from_laboratory_url: 'https://dasa-backend.herokuapp.com/api/remove/{exam_id}/from-lab/{laboratory_id}',
      show_active_exams_url: 'https://dasa-backend.herokuapp.com/api/exam',
      create_exam_url: 'https://dasa-backend.herokuapp.com/api/create/exam',
      edit_exam_url: 'https://dasa-backend.herokuapp.com/api/edit/exam/{exam_id}',
      delete_exam_url: 'https://dasa-backend.herokuapp.com/api/delete/exam/{exam_id}',
    },
    if_testing_locally: {
      show_active_laboratories_url: 'http://localhost:3000/api/laboratory',
      show_laboratories_with_specific_exam_url: 'http://localhost:3000/api/laboratory/{exam_name}',
      create_laboratory_url: 'http://localhost:3000/api/create/laboratory',
      edit_laboratory_url: 'http://localhost:3000/api/edit/laboratory/{laboratory_id}',
      delete_laboratory_url: 'http://localhost:3000/api/delete/laboratory/{laboratory_id}',
      add_exam_to_laboratory_url: 'http://localhost:3000/api/add/{exam_id}/to-lab/{laboratory_id}',
      remove_exam_from_laboratory_url: 'http://localhost:3000/api/remove/{exam_id}/from-lab/{laboratory_id}',
      show_active_exams_url: 'http://localhost:3000/api/exam',
      create_exam_url: 'http://localhost:3000/api/create/exam',
      edit_exam_url: 'http://localhost:3000/api/edit/exam/{exam_id}',
      delete_exam_url: 'http://localhost:3000/api/delete/exam/{exam_id}',
    },
  });
});

module.exports = router;
