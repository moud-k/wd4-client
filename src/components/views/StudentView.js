/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
const StudentView = (props) => {
  const { student } = props;

  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h4>{"Email: " + student.email}</h4>
      {student.gpa ? <h4>{"GPA: " + (student.gpa).toFixed(2)}</h4> : <h4>{"GPA: N/A"}</h4>}
      <img src={student.imageurl} alt="Image Not Available"/>
      {student.campus.id ? <h3>{student.campus.name}</h3> : <h3>{"Campus: N/A"}</h3>}
    </div>
  );

};

export default StudentView;