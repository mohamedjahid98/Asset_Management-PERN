import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const ReturnData = () => {
  const [rtnAsset, setRtnAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');



  useEffect(() => {
    axios.get("http://localhost:3001/issues/issuedata")
      .then(result => {
        const formattedAssets = result.data.issuedata.map(assetsmas => {
          return {
            ...assetsmas,
            ret_date: new Date(assetsmas.ret_date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            }),
          };
        });
        const sortedAssets = formattedAssets.sort((a, b) => a.id - b.id);
        setRtnAssets(sortedAssets);      })
      .catch(err => console.log(err));
  }, []);

  const filteredAssets = rtnAsset.filter(item => {
    const searchFields = [item.empid, item.empsname, item.asset_type, item.ret_date, item.reason];
    return searchFields.some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div>
      <main className='main-container'>
        <div className="card-box-emp">
          <div className="row">
            <div className="col-sm-12">
              <h2 style={{ textAlign: 'center', color: "black" }}>Return Asset</h2>
            </div>
          </div>
          <div className="p-input-icon-right">
            <i className="pi pi-search" />
            <input className="form-control" type="text" placeholder="Search" value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}/>
          </div><br/><br/>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Employee ID </th>
                <th>Employee Name</th>
                <th>Asset Type</th>
                <th>Return Date</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredAssets.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.empid}</td>
                      <td>{item.empsname}</td>
                      <td>{item.asset_type}</td>
                      <td>{item.ret_date}</td>
                      <td style={{ color:item.reason.toLowerCase() === 'success' ? 'green' :item.reason.toLowerCase() === 'repair' ? 'blue' :item.reason.toLowerCase() === 'damage' ? 'red' :item.reason.toLowerCase() === 'return' ? 'orange' :'black', fontSize: '16px',  // Adjust the font size as needed
  fontWeight: 'bold'}}>{item.reason}</td>

  

                      <td><Link to={`/return-asset/update/${item.id}`}>
                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-primary" />
                      </Link></td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ReturnData;
