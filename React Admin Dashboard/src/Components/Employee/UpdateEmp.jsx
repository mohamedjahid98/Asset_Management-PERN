import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const UpdateEmp = () => {

  const { id } = useParams()
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

  useEffect(() => {
    axios.get(`http://localhost:3001/employee/getEmployee/${id}`)
        .then(result => {
            //console.log(result.data);
            const employeeData = result.data.employee;
            setEmpname(employeeData.empname);
            setEmail(employeeData.email);
            setDept(employeeData.dept);
            setPosition(employeeData.position);
            setMobileno(employeeData.mobile_no);
        })
        .catch(err => console.log(err));
}, [id]);


 const Update = (e) => {
    e.preventDefault();
    if (validateForm()) {
        //console.log("Updating with data:", { empname, email, dept, position, mobile_no });
        axios.put(`http://localhost:3001/employee/updateEmployee/${id}`, { empname, email, dept, position, mobile_no })
            .then(result => {
                console.log(result.data);
                navigate('/employee');
            })
            .catch(err => console.log(err));
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
            <form onSubmit={Update}>
            <div className='row'>
                <div className='col-sm-6'>
                  <label>Name</label>
                  <input type='text' placeholder='Enter Name' className={`form-control ${errors.empname ? 'is-invalid' : ''}`} value={empname}
                    onChange={(e) => setEmpname(e.target.value)} />
                  {errors.empname && <div className="invalid-feedback">{errors.empname}</div>}
                </div><br />
                <div className='col-sm-6'>
                  <label>E-Mail</label>
                  <input type="email" placeholder="Enter E-Mail" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Department</label>
                  <input type="text" placeholder="Enter Department" className={`form-control ${errors.dept ? 'is-invalid' : ''}`} value={dept}
                    onChange={(e) => setDept(e.target.value)} />
                  {errors.dept && <div className="invalid-feedback">{errors.dept}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Position</label>
                  <input type="text" placeholder='Enter Position' className={`form-control ${errors.position ? 'is-invalid' : ''}`} value={position}
                    onChange={(e) => setPosition(e.target.value)} />
                  {errors.position && <div className="invalid-feedback">{errors.position}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Mobile Number</label>
                  <input type="number" placeholder='Enter No' className={`form-control ${errors.mobile_no ? 'is-invalid' : ''}`} value={mobile_no}
                    onChange={(e) => setMobileno(e.target.value)} />
                  {errors.mobile_no && <div className="invalid-feedback">{errors.mobile_no}</div>}
                </div>
              </div><br />
              <button className='btn btn-primary'>Update</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UpdateEmp
