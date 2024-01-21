import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs'
import axios from 'axios';

function Home() {

  const [apiData, setApiData] = useState([]);
  const [issues,setAssets ] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [assetCount, setAssetCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3001/authSignup/signupdata')
      .then((response) => response.json())
      .then((data) => {
        setUserCount(data.users.length);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/employee/empdata')
      .then((response) => response.json())
      .then((data) => {
        setEmployeeCount(data.users.length);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/category/categorydata")
    .then((response) => response.json())
    .then((data) => {
      setApiData(data.categorydata);
      setProductCount(data.categorydata.length);
    })      .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/assets/assetsdata")
    .then((response) => response.json())
    .then((data) => {
      setAssetCount(data.assetsdata.length);
    })      .catch(err => console.log(err))
  }, []);

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
            setAssets(formattedAssets);
        })
        .catch(err => console.log(err));
}, []);
const sortedData = [...apiData].sort((a, b) => a.id - b.id);


  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3 style={{color:'black'}}>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h6>Assets</h6>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>{assetCount}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h6>CATEGORIES</h6>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>{productCount}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h6>EMPLOYEES</h6>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>{employeeCount}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h6>USERS</h6>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>{userCount}</h1>
            </div>
        </div>

        <div className='row charts'>
          <div className='col'>
          <h6 style={{ color: "black" }}>Assets Catagory</h6>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Category ID </th>
                <th>Category Name</th>
              </tr>
            </thead>
            <tbody>
            {sortedData.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.categoryname}</td>
          </tr>
        ))}
            </tbody>
          </table>
          </div>
            <div className='col'>
              <h6 style={{ color: "black" }}>Employee Assets</h6>
            <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Issue Date</th>
                <th>Return Date</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {
                issues.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.empsname}</td>
                      <td>{item.issue_date}</td>
                      <td>{item.ret_date}</td>
                      <td style={{ color:item.reason.toLowerCase() === 'success' ? 'green' :item.reason.toLowerCase() === 'repair' ? 'blue' :item.reason.toLowerCase() === 'damage' ? 'red' :item.reason.toLowerCase() === 'return' ? 'orange' :'black', fontSize: '16px',  // Adjust the font size as needed
  fontWeight: 'bold'}}>{item.reason}</td>
                      </tr>
                  );
                })
              }
            </tbody>
          </table>            </div>
            </div>
    </main>
  )
}

export default Home