import React, { useState,useEffect } from 'react'
import axios from 'axios';

const Scrap_Asset = () => {
  const [scrapAsset, setscrapAssets] = useState([]);
  const [asset_type, setAsset_type] = useState('');
  const [scrap_date, setScrap_date] = useState('');
  const [reason, setReason] = useState('');
  const [categoryMaster, setCategorymaster] = useState([]);
  const [errors, setErrors] = useState({});

  const sortedData = [...scrapAsset].sort((a, b) => a.id - b.id);

  const validateForm = () => {
    let valid = true;
    const errors = {};
    if (!asset_type) {
      errors.asset_type = 'Asset Type is required';
      valid = false;
    } if (!scrap_date) {
      errors.scrap_date = 'Date is required';
      valid = false;
    } if (!reason) {
      errors.reason = 'Reason is required';
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

  useEffect(() => {
    axios.get("http://localhost:3001/scrap/scrapdata")
    .then(result => {
        const formattedAssets = result.data.scrapdata.map(assetsmas => {
          return {
            ...assetsmas,
            scrap_date: new Date(assetsmas.scrap_date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            }),
          };
        });
        setscrapAssets(formattedAssets);
      }).catch(err => console.log(err))
  }, []);

  const clearInput = () => {
    setscrapAssets('');
    setErrors({});
  };
  const Submit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post('http://localhost:3001/scrap/createScrap', { asset_type, scrap_date, reason })
        .then((result) => {
          console.log(result);
          clearInput();
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <main className='main-container'>
      <h5 style={{ textAlign: 'center',color:'black' }}>Scrap Assets </h5>
        <div className="card-box-emp">
          <form onSubmit={Submit}>
            <div className='row'>
              <div className='col-sm-4'>
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
              <div className='col-sm-4'>
                <label>Scrap Date</label>
                <input type="date" placeholder="Enter Date" className={`form-control ${errors.scrap_date ? 'is-invalid' : ''}`}
                    onChange={(e) => setScrap_date(e.target.value)} />
                  {errors.scrap_date && <div className="invalid-feedback">{errors.scrap_date}</div>}
              </div>
              <div className='col-sm-4'>
                <label>Reason</label>
                <input type="text" placeholder="Enter Reason" className={`form-control ${errors.reason ? 'is-invalid' : ''}`}
                    onChange={(e) => setReason(e.target.value)} />
                  {errors.reason && <div className="invalid-feedback">{errors.reason}</div>}
              </div>
              <div className='col-sm-4'><br />
                <button type='submit' className='btn btn-success'>Submit</button>
              </div>
            </div>
          </form>
        </div>
        <div className="card-box-emp">
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
              <th>ID</th>
                <th>Asset Type</th>
                <th>Scrap Date</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {
                sortedData.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.asset_type}</td>
                      <td>{item.scrap_date}</td>
                      <td>{item.reason}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default Scrap_Asset
