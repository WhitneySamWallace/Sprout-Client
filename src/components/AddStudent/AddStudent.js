import React from 'react';
import Nav from '../Nav/Nav';
import './AddStudent.css';
import Context from '../../context/Context';
import StudentsApiService from '../../services/students-api-service';

class AddStudent extends React.Component {
  static contextType = Context;

  componentDidMount() {
    this.context.clearError();
    StudentsApiService.getStudents()
      .then(students => this.context.setStudents(students))
      .catch(error => this.context.setError(error))
  }

  render() {
    const students = this.context.students.map((student, index) => {
      return (<li key={index}>
        {student.name}
        <button onClick={e => this.context.handleDeleteStudent(student)}>Delete</button>
      </li>)
    })
    return (
      <div className="Add-Student">
      <Nav />
      <main>
        <header>
          <h2>Add Students</h2>
        </header>
        <form onSubmit={e => this.context.handleAddStudentSubmit(e)}>
          <div>
            <label htmlFor="student-name">Student Name</label>
            <input 
            placeholder="Student Name" 
            type="text" 
            name="student-name" 
            id="student-name" 
            required
            aria-required="true"
            aria-label="student name to add"
            value={this.context.newStudentName}
            onChange={e => this.context.updateNewStudentName(e.target.value)}/>
          </div>
          <button type="submit">Add</button>
        </form>
      </main>
      <section>
        <ul>
          {students}
        </ul>
      </section>
    </div>
    )
  }
}

export default AddStudent;