const fs = require('fs')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

// 1) MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

const students = JSON.parse(fs.readFileSync(`db.json`))

// Helper function to get the next ID
const getNextId = () => {
  if (students.length === 0) return 1
  const ids = students.map((student) => student.id)
  return Math.max(...ids) + 1
}

const getAllStudents = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: students.length,
    data: {
      students,
    },
  })
}

const getStudent = (req, res) => {
  const id = parseInt(req.params.id, 10)

  const student = students.find((student) => student.id === id)

  if (!student) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      student,
    },
  })
}

const createStudent = (req, res) => {
  const id = getNextId()
  const newStudent = Object.assign({ id }, req.body)

  students.push(newStudent)

  fs.writeFile('db.json', JSON.stringify(students), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        newStudent,
      },
    })
  })
}

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const student = students.find((student) => student.id === id)

  if (!student) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    })
  }

  Object.assign(student, req.body)

  fs.writeFile('db.json', JSON.stringify(students), (err) => {
    res.status(200).json({
      status: 'success',
      data: {
        student,
      },
    })
  })
}

const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const studentIndex = students.findIndex((student) => student.id === id)

  if (studentIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    })
  }

  students.splice(studentIndex, 1)

  fs.writeFile('db.json', JSON.stringify(students), (err) => {
    res.status(204).json({
      status: 'success',
      data: null,
    })
  })
}

// app.get('/api/v1/students', getAllStudents)
// app.get('/api/v1/students/:id', getStudent)
// app.post('/api/v1/students', createStudent)
// app.patch('/api/v1/students/:id', updateStudent)
// app.delete('/api/v1/students/:id', deleteStudent)

// short for above

app.route('/api/v1/students').get(getAllStudents).post(createStudent)

app
  .route('/api/v1/students/:id')
  .get(getStudent)
  .patch(updateStudent)
  .delete(deleteStudent)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))

// NOTES :
// PUT expects entire object
// PATCH expects only updated object properties
