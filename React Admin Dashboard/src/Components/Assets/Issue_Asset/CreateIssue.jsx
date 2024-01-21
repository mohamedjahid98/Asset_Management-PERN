import React, { useState ,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const CreateIssue = () => {
  const [empId, setEmpId] = useState('');
  const [empsname, setEmpsname] = useState('');
  const [asset_type, setAsset_type] = useState('');
  const [issue_date, setIssue_date] = useState('');
  const [ret_date, setRet_date] = useState('');
  const [reason, setReason] = useState('');
  const [employees, setEmployees] = useState([]);
  const [categoryMaster, setCategorymaster] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/employee/empdata")
      .then(result => setEmployees(result.data.users))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/category/categorydata")
      .then(result => setCategorymaster(result.data.categorydata))
      .catch(err => console.log(err))
  }, []);

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!empsname) {
      errors.empsname = 'Employee Name is required';
      valid = false;
    } if (!asset_type) {
      errors.asset_type = 'Asset Type is required';
      valid = false;
    } if (!issue_date) {
      errors.issue_date = 'Issue Date is required';
      valid = false;
    } if (!ret_date) {
      errors.ret_date = 'Return Date is required';
      valid = false;
    } if (!reason) {
        errors.reason = 'Reason is required';
        valid = false;
      }
    setErrors(errors);
    return valid;
  };

  const handleEmpNameChange = (e) => {
    const selectedEmp = employees.find(emp => emp.empname === e.target.value);
    if (selectedEmp) {
      setEmpsname(selectedEmp.empname);
      setEmpId(selectedEmp.id);
    } else {
      setEmpsname('');
      setEmpId('');
    }
  };

  const handleIssueDateChange = (e) => {
    const selectedDate = e.target.value;
    setIssue_date(selectedDate);

    // Automatically set Return Date to 7 days after Issue Date
    const issueDate = new Date(selectedDate);
    issueDate.setDate(issueDate.getDate() + 6);
    const formattedReturnDate = issueDate.toISOString().split('T')[0];
    setRet_date(formattedReturnDate);
  };

  const Submit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post('http://localhost:3001/issues/createIssue', {empId,empsname, asset_type, issue_date, ret_date, reason })
        .then((result) => {
          console.log(result);
          navigate('/issue-asset');
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
              <h2 style={{ textAlign: 'center' }}>Add Issues</h2>
              <a href="/issue-asset"  id="addbtn" className="btn btn-primary btn-rounded">Back</a>
            </div>
          </div><br/>
          
          <div class="card-box-emp">
            <form onSubmit={Submit}>
              <div className='row'>
              <div className='col-sm-3'>
                  <label>Employee ID</label>
                  <input type='text' placeholder="Select Employee Name" className="form-control" value={empId} readOnly />
                </div>
                <div className='col-sm-3'>
                  <label>Employee Name</label>
                  <select value={empsname}  onChange={handleEmpNameChange} style={{ appearance: 'menulist', WebkitAppearance: 'menulist' }}
                    className={`form-control ${errors.empname ? 'is-invalid' : ''}`}>
                    <option value="" readOnly>Select Employee</option>
                    {employees.map(employee => (
                      <option key={employee.id} value={employee.empname}>
                        {employee.empname}
                      </option>
                    ))}
                  </select>
                  {errors.empsname && <div className="invalid-feedback">{errors.empsname}</div>}
                </div>
               <div className='col-sm-6'>
                  <label>Asset Type</label>
                  <select value={asset_type} onChange={(e) => setAsset_type(e.target.value)} style={{ appearance: 'menulist', WebkitAppearance: 'menulist' }}
                    className={`form-control ${errors.asset_type ? 'is-invalid' : ''}`}>
                    <option value="">Select Asset Type</option>
                    {categoryMaster.map(category => (
                      <option key={category.id} value={category.categoryname}>
                        {category.categoryname}
                      </option>
                    ))}
                  </select>
                  {errors.asset_type && <div className="invalid-feedback">{errors.asset_type}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Issue Date</label>
                  <input type="date" placeholder="Enter Issue Date" className={`form-control ${errors.issue_date ? 'is-invalid' : ''}`}
                    onChange={handleIssueDateChange}/>
                  {errors.issue_date && <div className="invalid-feedback">{errors.issue_date}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Return Date</label>
                  <input type="date" placeholder='Enter Return Date' className={`form-control ${errors.ret_date ? 'is-invalid' : ''}`}
                    value={ret_date}
                    onChange={(e) => setRet_date(e.target.value)}/>
                  {errors.ret_date && <div className="invalid-feedback">{errors.ret_date}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Reason</label>
                  <input type="text" placeholder='Enter Reason' className={`form-control ${errors.reason ? 'is-invalid' : ''}`}
                    onChange={(e) => setReason(e.target.value)} />
                  {errors.reason && <div className="invalid-feedback">{errors.reason}</div>}
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

export default CreateIssue
