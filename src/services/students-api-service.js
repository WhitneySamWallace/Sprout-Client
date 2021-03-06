import config from "../config";
import TokenService from "../services/token-service";

const StudentsApiService = {
  // For populating student data from database
  getStudents() {
    return fetch(`${config.API_ENDPOINT}/students`, {
      method: "GET",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => {
      return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
    });
  },
  // For adding new student to database
  postStudent(name, user_id) {
    return fetch(`${config.API_ENDPOINT}/students`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        name,
        user_id
      })
    }).then(res => {
      return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
    });
  },
  // For deleting student from database
  deleteStudent(id) {
    return fetch(`${config.API_ENDPOINT}/students/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        id
      })
    }).then(res => {
      if (!res.ok) {
        throw new Error("Something went wrong!  Please try again.");
      }
    });
  },
  // For updating student data in database
  updateStudent(id, data) {
    return fetch(`${config.API_ENDPOINT}/students/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        id,
        ...data
      })
    }).then(res => {
      if (!res.ok) {
        throw new Error("Something went wrong!  Please try again.");
      }
    });
  }
};

export default StudentsApiService;
