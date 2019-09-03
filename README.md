# Dasa Backend Challenge

API link: https://dasa-backend.herokuapp.com

---

In this project, I've created a REST API as part of DASA admission test.

The objective of this API was to build a CRUD model for labs and exams, as well their possible interactions.


---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Docker
- Mocha/Chai/SuperTest
- Heroku
- Postman

---

## Instructions for use

### Use the deployed link:
- API link: https://dasa-backend.herokuapp.com

### Local:
- To use the container, in the terminal you build with <code class="blue">docker-compose build</code> and then run with <code class="blue">docker-compose up</code>. To stop the container use <code class="blue">docker-compose down</code>.


- You can use <code class="blue">npm start</code> but you will need to create a **.env** file and configure the **PORT** and **MONGODB_URI** so you can run it.

### Testing:
- Run tests: <code class="blue">npm test</code>


---

## EndPoints
    note: if running locally use localhost url rather than heroku url.
- **Laboratory**
    - **Register a new lab:** 
`https://dasa-backend.herokuapp.com/api/create/laboratory`<br>
Requires name and address
    - **Show all active labs:**
`https://dasa-backend.herokuapp.com/api/laboratory`
    - **Edit a lab:**
`https://dasa-backend.herokuapp.com/api/edit/laboratory/{laboratory_id}`<br>
Requires name, address and status
    - **Remove lab:**
`https://dasa-backend.herokuapp.com/api/delete/laboratory/{laboratory_id}`

- **Exams**
    - **Register a new exam:** 
`https://dasa-backend.herokuapp.com/api/create/exam`<br>
Requires name and type
    - **Show all active exams:**
`https://dasa-backend.herokuapp.com/api/exam`
    - **Edit exam:**
`https://dasa-backend.herokuapp.com/api/edit/exam/{exam_id}`<br>
Requires name, address and status
    - **Remove exam:**
`https://dasa-backend.herokuapp.com/api/delete/exam/{exam_id}`

- **Association**
    - **Add exam to a lab:**
`https://dasa-backend.herokuapp.com/api/add/{exam_id}/to-lab/{laboratory_id}`
    - **Remove exam from a lab:**
`https://dasa-backend.herokuapp.com/api/remove/{exam_id}/from-lab/{laboratory_id}`
    - **Show all laboratories associated with an exam:**
`https://dasa-backend.herokuapp.com/api/laboratory/{exam_name}`<br>
Exam name params must be passed with "-" rather than " " (empty spaces)<br>
Example: `https://dasa-backend.herokuapp.com/api/laboratory/exame-teste`
