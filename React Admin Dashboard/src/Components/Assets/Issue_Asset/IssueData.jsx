import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';

const IssueData = () => {
  const [issues,setAssets ] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

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

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  return (
    <div>
      <main className='main-container'>
        <div className="card-box-emp">
          <div className="row">
            <div className="col-sm-12">
              <h2 style={{ textAlign: 'center', color: "black" }}>Issues Asset</h2>
              <a href="/issue-asset/create" style={{ float: 'right' }} id="addbtn" className="btn btn-success btn-rounded">Add New</a>
            </div>
          </div>
          <div className="flex justify-content-start">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </span>
          </div><br />
          <DataTable value={issues} showGridlines filters={filters} globalFilterFields={['empid','empname', 'asset_type', 'issue_date', 'ret_date', 'reason']} stripedRows paginator rows={5} rowsPerPageOptions={[2, 5, 10]} tableStyle={{ minWidth: '50rem' }}
            emptyMessage="No Issue found." sortField="empid" sortOrder={1}>
            <Column field="empid"  header="Employee ID" sortable></Column>
            <Column field="empsname" filterField="empsname" header="Employee Name" sortable></Column>
            <Column field="asset_type" filterField="asset_type" header="Asset Type" sortable></Column>
            <Column field="issue_date" filterField="issue_date" header="Issue Date" sortable></Column>
            <Column field="ret_date" filterField="ret_date" header="Return Date" sortable></Column>
            <Column field="reason" filterField="reason" header="Reason" sortable></Column>
          </DataTable>
        </div>
      </main>
    </div>
  );
};

export default IssueData
