import React from "react";
import Nav from "../Nav/Nav";
import "./Main.css";
import Context from "../../context/Context";
import StudentsApiService from "../../services/students-api-service";
import TokenService from "../../services/token-service";

class Main extends React.Component {
  static contextType = Context;

  // When component loads, gets students from server
  componentDidMount() {
    this.context.clearError();
    if(TokenService.hasAuthToken()) {
      return StudentsApiService.getStudents()
      .then(students => this.context.setStudents(students))
      .catch(error => this.context.setError(error));
    }
    
    this.props.history.push("/login");
    this.context.setStudents([]);
  }

  render() {
    // Students are sorted and listed so that students requiring checkins move to top of list
    // Student that has first expired timer stays at the top of the list
    // Students that do not have expired timers stay beneath all students with expired timers
    const studentsFromContext = this.context.students || [];
    const studentsToSort = studentsFromContext.filter(
      student => student.order !== 0
    );

    const sortedStudents = studentsToSort.sort((a, b) =>
      a.order > b.order ? 1 : -1
    );

    const studentsToList = studentsFromContext.filter(
      student => student.order === 0
    );

    const allStudents = [...sortedStudents, ...studentsToList];

    const students = allStudents.map((student, index) => {
      return (
        <li
          key={index}
          className={student.alert === true ? `alert ${student.priority}` : ""}
        >
          <h4>{student.name}</h4>
          <p className="goal">Goal: {student.goal}</p>
          <p>Priority: {student.priority}</p>
          <button
            className={student.expand ? "cancel" : "checkin"}
            onClick={e => this.context.toggleExpand(student.id)}
          >
            {student.expand === true ? "Cancel" : "Check In"}
          </button>
          <div className={student.expand === false ? "hidden" : "show"}>
            <form onSubmit={e => this.context.handleUpdateGoal(e, student.id)}>
              <div>
                <label htmlFor="new-goal">New Goal:</label>
                <textarea
                  placeholder="New Mini-Goal"
                  name="new-goal"
                  id="new-goal"
                  type="text"
                  value={this.context.minigoal}
                  onChange={e => this.context.updateMiniGoal(e.target.value)}
                  required
                />
              </div>
              <div className="radio">
                <input
                  type="radio"
                  value="0"
                  id="high"
                  name="priority"
                  onChange={e => this.context.updatePriority("high")}
                />
                <label htmlFor="high">High</label>
                <input
                  type="radio"
                  value="1"
                  id="medium"
                  name="priority"
                  onChange={e => this.context.updatePriority("medium")}
                />
                <label htmlFor="medium">Medium</label>
                <input
                  type="radio"
                  value="3"
                  id="low"
                  name="priority"
                  onChange={e => this.context.updatePriority("low")}
                />
                <label htmlFor="low">Low</label>
              </div>
              <button type="submit" className="update-submit">
                Update
              </button>
            </form>
          </div>
        </li>
      );
    });
    return (
      <div className="main-view">
        <Nav />
        <main>
          <header>
            <h2>Welcome back{(this.context.username) ? `, ${this.context.username}` : ''}!</h2>
          </header>
          {/* {this.context.error && <p className="error">{this.context.error}</p>} */}
          <section className="student-list">
            <h3>Student List</h3>
            <div className="reset-button-container">
              <button
                onClick={e => this.context.handleReset(e)}
                className="reset-button"
              >
                Reset
              </button>
            </div>
            <div className="student-list-container">
              <ul>{students}</ul>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default Main;
