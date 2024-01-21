import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const CreateAssets = () => {
  const [serial_no, setSerial_no] = useState('');
  const [asset_type, setAsset_type] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [purchase_date, setPurchase_date] = useState('');
  const [purchase_cost, setPurchase_cost] = useState('');
  const [categoryMaster, setCategorymaster] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!serial_no) {
      errors.serial_no = 'Serial Number is required';
      valid = false;
    } else if (!/^\d{4}$/.test(serial_no)) {
      errors.serial_no = 'Serial Number must be exactly 4 digits';
      valid = false;
    }if (!asset_type) {
      errors.asset_type = 'Asset Type is required';
      valid = false;
    } if (!make) {
      errors.make = 'Make is required';
      valid = false;
    } if (!model) {
      errors.model = 'Model is required';
      valid = false;
    } if (!purchase_date) {
        errors.purchase_date = 'Purchase Date is required';
        valid = false;
      } if (!purchase_cost) {
        errors.purchase_cost = 'Purchase Cost is required';
        valid = false;
      }
    setErrors(errors);
    return valid;
  };

  useEffect(() => {
    axios.get("http://localhost:3001/category/categorydata")
      .then(result => setCategorymaster(result.data.categorydata))
      .catch(err => console.log(err))
  }, []);

  const Submit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post('http://localhost:3001/assets/createAssetsmas', { serial_no, asset_type, make, model, purchase_date,purchase_cost })
        .then((result) => {
          console.log(result);
          navigate('/assets-manager');
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
              <h2 style={{ textAlign: 'center' }}>Add Assets</h2>
              <a href="/assets-manager"  id="addbtn" className="btn btn-primary btn-rounded">Back</a>
            </div>
          </div><br/>
          
          <div class="card-box-emp">
            <form onSubmit={Submit}>
              <div className='row'>
                <div className='col-sm-6'>
                  <label>Serial Number</label>
                  <input type='number' placeholder='Enter Number' className={`form-control ${errors.serial_no ? 'is-invalid' : ''}`}
                    onChange={(e) => setSerial_no(e.target.value)} />
                  {errors.serial_no && <div className="invalid-feedback">{errors.serial_no}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Asset Type</label>
                  <select
                    value={asset_type} style={{ appearance: 'menulist', WebkitAppearance: 'menulist' }}
                    onChange={(e) => setAsset_type(e.target.value)}
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
                  <label>Make</label>
                  <input type="text" placeholder="Enter Make" className={`form-control ${errors.make ? 'is-invalid' : ''}`}
                    onChange={(e) => setMake(e.target.value)} />
                  {errors.make && <div className="invalid-feedback">{errors.make}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Model</label>
                  <input type="text" placeholder='Enter Model' className={`form-control ${errors.model ? 'is-invalid' : ''}`}
                    onChange={(e) => setModel(e.target.value)} />
                  {errors.model && <div className="invalid-feedback">{errors.model}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Purchase Date</label>
                  <input type="date" placeholder='Enter Date' className={`form-control ${errors.purchase_date ? 'is-invalid' : ''}`}
                    onChange={(e) => setPurchase_date(e.target.value)} />
                  {errors.purchase_date && <div className="invalid-feedback">{errors.purchase_date}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Purchase Cost</label>
                  <input type="number" placeholder='Enter Cost' className={`form-control ${errors.purchase_cost ? 'is-invalid' : ''}`}
                    onChange={(e) => setPurchase_cost(e.target.value)} />
                  {errors.purchase_cost && <div className="invalid-feedback">{errors.purchase_cost}</div>}
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

export default CreateAssets
