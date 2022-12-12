import React,{useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import StudentList from './components/StudentList';

function App() {
  // Define state variables
  const [studentList, setStudentList] = useState([{}]);
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');  

  // Get student data on Page Load
  useEffect(()=>{
    getStudents();
  },[]);

  const getStudents = () =>{
    axios.get('http://127.0.0.1:8000/students')
    .then(
      response => {
        console.log(response.data);
        setStudentList(response.data);//Set data in StateVariables
      }
    )//resolve the promise
    .catch((error)=>{
        console.log(error);
    })
  }

  const addNewStudent = (student) =>{
    axios.post('http://127.0.0.1:8000/students', student)
    .then(response=>{
      getStudents();
      alert("Student Added successfully!");
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  const updateStudent = (student) =>{
    axios.put(`http://127.0.0.1:8000/students/${studentId}`, student)
    .then(response=>{
      getStudents();
      alert("Student Updated successfully!");
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  const addStudent = () =>{
    const student = {'student_name':studentName,'student_email':studentEmail,'student_ph':studentPhone};
    if(studentId !== ''){
      updateStudent(student);
    }
    else{
      addNewStudent(student);
    }
  }

  return (
    <div className='container'>
      <div className='card text-center mt-3 list-group-item justify-content-center align-items-center mx-auto' style={{"width":'75vw', "backgroundColor":"#fff"}}>
      <h2 className='card text-white bg-info mt-2 mb-2 p-2'>School Management System</h2>
      <h3 className='card text-white bg-info mb-2 p-2'>Manage Students List</h3>
      <div className='card-body'>
        <h5 className='card text-white bg-dark pb-1'>Add Student</h5>
        <span>
          <input value={studentName} onChange={event=>setStudentName(event.target.value)} className='form-control student-name mb-2' placeholder='Student Name'></input>
          <input value={studentEmail} onChange={event=>setStudentEmail(event.target.value)} className='form-control student-email mb-2' placeholder='Student E-mail'></input>
          <input value={studentPhone} onChange={event=>setStudentPhone(event.target.value)} className='form-control student-phone mb-3' placeholder='Phone Number'></input>
          <button onClick={addStudent} className='btn btn-outline-warning mb-4' style={{'fontWeight':'bold'}}>Add Student</button>
        </span>
        <h5 className='card text-white bg-dark pb-1'>Your Students</h5>
      <div>
        <StudentList 
        setStudentId={setStudentId}
        setStudentName={setStudentName}
        setStudentEmail={setStudentEmail}
        setStudentPhone={setStudentPhone}
        setStudentList={setStudentList}
        studentListVar={studentList}></StudentList>
      </div>
      </div>
      <h6 className='card text-dark bg-warning py-2 mt-2'>All Rights Reserved &copy; 2022-23</h6>
      </div>
    </div>
  );
}

export default App;
