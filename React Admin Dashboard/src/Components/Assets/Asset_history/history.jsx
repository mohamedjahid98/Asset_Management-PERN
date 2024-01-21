import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';


const AssetHistory = () => {
  const [scrapAssets, setScrapAssets] = useState([]); // Add state for scrapAssets
  const [rtnAssets, setRtnAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get("http://localhost:3001/issues/issuedata")
      .then(result => {
        const formattedAssets = result.data.issuedata.map(assetsmas => {
          return {
            ...assetsmas,
            issue_date: new Date(assetsmas.issue_date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            }),
            ret_date: new Date(assetsmas.ret_date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            }),
          };
        });
        setRtnAssets(formattedAssets);
      })
      .catch(err => console.log(err));
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
        setScrapAssets(formattedAssets);
      })
      .catch(err => console.log(err));
  }, []);

  const mergeAssets = () => {
    return rtnAssets.map((issuedAsset) => {
      const matchingScrapAsset = scrapAssets.find(
        (scrapAsset) => scrapAsset.asset_type === issuedAsset.asset_type
      );

      return {
        ...issuedAsset,
        scrap_date: matchingScrapAsset ? matchingScrapAsset.scrap_date : "No Scrap Date",
      };
    });
  };

  const mergedAssets = mergeAssets();

  const filteredAssets = mergedAssets.filter((item) => {
    const searchFields = [
      item.empid,
      item.empsname,
      item.asset_type,
      item.ret_date,
      item.reason,
    ];
    return searchFields.some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });


  return (
    <div>
      <main className='main-container'>
        <div className="card-box-emp">
          <div className="row">
            <div className="col-sm-12">
              <h2 style={{ textAlign: 'center', color: "black" }}>Asset History</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
          <div className="p-input-icon-right">
            <input className="form-control" type="text" placeholder="Search" value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}/>
          </div></div>
          <div className="col-sm-4">
          <ReactHTMLTableToExcel
  id="downloadButton"
  className="btn btn-primary"
  table="asset-table"
  filename="asset_history"
  sheet="Sheet"
  buttonText={
    <span>
      <FontAwesomeIcon icon={faFileExcel} />
    </span>
  }
/>
          </div></div><br/>
          <table id='asset-table' className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Employee ID </th>
                <th>Employee Name</th>
                <th>Asset Type</th>
                <th>Issue Date</th>
                <th>Return Date</th>
                <th>Scrap Date</th>
                <th>Reason</th>
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
                      <td>{item.issue_date}</td>
                      <td>{item.ret_date}</td>
                      <td>{item.scrap_date}</td>
                      <td >{item.reason}</td>

                      
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

export default AssetHistory
