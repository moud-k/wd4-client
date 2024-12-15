/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { editStudentThunk } from '../../store/thunks';
import { fetchStudentThunk } from '../../store/thunks';



class EditStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      campusId: null, 
      email: "",
      imageurl: "",
      gpa: null,
      id: 0,
      redirect: false, 
      redirectId: null
    };
  }
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);
  }
  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let student = {
        firstname: this.state.firstname || this.props.student.firstname,
        lastname: this.state.lastname || this.props.student.lastname,
        campusId: this.state.campusId || this.props.student.campusId,
        email: this.state.email || this.props.student.email,
        imageurl: this.state.imageurl || this.props.student.imageurl,
        gpa: this.state.gpa || this.props.student.gpa,
        id: this.props.match.params.id
    };
    
    let regex_alpha = /^[a-zA-Z]+$/;
    let regex_email = /^[a-zA-z0-9.]+@[a-zA-z0-9.]*[.][a-zA-z]+$/;

    if(regex_alpha.test(student.firstname) && regex_alpha.test(student.lastname) && regex_email.test(student.email)) {
        // edit student in back-end database
        await this.props.editStudent(student);

        // Update state, and trigger redirect to show the edited student
        this.setState({
        redirect: true, 
        redirectId: this.props.match.params.id
        });
    }
  }

//   // Unmount when the component is being removed from the DOM:
//   componentWillUnmount() {
//       this.setState({redirect: false, redirectId: null});
//   }

  // Render edit student input form
  render() {
    // Redirect to edited student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}
          student={this.props.student}
          editStudent={this.props.editStudent}
        />
      </div>          
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "StudentContainer" to connect to Redux Store.  
// The following 2 input arguments are passed to the "connect" function used by "AllCampusesContainer" component to connect to Redux Store.
const mapState = (state) => {
    return {
      student: state.student,  // Get the State object from Reducer "student"
    };
  };
// The following input argument is passed to the "connect" function used by "EditStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
        editStudent: (student) => dispatch(editStudentThunk(student)),
    })
}



// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);