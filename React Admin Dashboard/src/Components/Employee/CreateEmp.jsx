import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const CreateEmp = () => {
  const [empname, setEmpname] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('');
  const [position, setPosition] = useState('');
  const [mobile_no, setMobileno] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!empname) {
      errors.empname = 'Employee Name is required';
      valid = false;
    } if (!email) {
      errors.email = 'E-Mail is required';
      valid = false;
    } if (!dept) {
      errors.dept = 'Department is required';
      valid = false;
    } if (!position) {
      errors.position = 'Position is required';
      valid = false;
    }
    if (!mobile_no) {
        errors.mobile_no = 'Mobile No is required';
        valid = false;
      }
    setErrors(errors);
    return valid;
  };

  const Submit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post('http://localhost:3001/employee/createEmployee', { empname, email, dept, position, mobile_no })
        .then((result) => {
          console.log(result);
          const employeeId = result.data.id;
          const existingIds = JSON.parse(localStorage.getItem('activeEmployeeIds')) || [];
          existingIds.push(employeeId);
          localStorage.setItem('activeEmployeeIds', JSON.stringify(existingIds));
          navigate('/employee');
        })
        .catch((err) => console.log(err));
    }
  };
  
  

  return (
    <div>
      <main className='main-container'>
                <div className="card-box-emp">
          <div class="row"  >
            <div class="col-sm-12">
              <h2 style={{ textAlign: 'center' }}>Add Employee</h2>
              <a href="/employee"  id="addbtn" className="btn btn-primary btn-rounded">Back</a>
            </div>
          </div><br/>
          
          <div class="card-box-emp">
            <form onSubmit={Submit}>
              <div className='row'>
                <div className='col-sm-6'>
                  <label>Name</label>
                  <input type='text' placeholder='Enter Name' className={`form-control ${errors.empname ? 'is-invalid' : ''}`}
                    onChange={(e) => setEmpname(e.target.value)} />
                  {errors.empname && <div className="invalid-feedback">{errors.empname}</div>}
                </div><br />
                <div className='col-sm-6'>
                  <label>E-Mail</label>
                  <input type="email" placeholder="Enter E-Mail" className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    onChange={(e) => setEmail(e.target.value)} />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Department</label>
                  <input type="text" placeholder="Enter Department" className={`form-control ${errors.dept ? 'is-invalid' : ''}`}
                    onChange={(e) => setDept(e.target.value)} />
                  {errors.dept && <div className="invalid-feedback">{errors.dept}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Position</label>
                  <input type="text" placeholder='Enter Position' className={`form-control ${errors.position ? 'is-invalid' : ''}`}
                    onChange={(e) => setPosition(e.target.value)} />
                  {errors.position && <div className="invalid-feedback">{errors.position}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Mobile Number</label>
                  <input type="number" placeholder='Enter No' className={`form-control ${errors.mobile_no ? 'is-invalid' : ''}`}
                    onChange={(e) => setMobileno(e.target.value)} />
                  {errors.mobile_no && <div className="invalid-feedback">{errors.mobile_no}</div>}
                </div>
              </div><br />
              <button className='btn btn-success'>Submit</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CreateEmp

