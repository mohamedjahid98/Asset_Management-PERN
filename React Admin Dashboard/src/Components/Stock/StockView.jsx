import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockView = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/assets/assetsdata")
      .then(result => setAssets(result.data.assetsdata))
      .catch(err => console.log(err))
  }, []);

  const getStockData = () => {
    const groupedAssets = {};

    assets.forEach((asset) => {
      const { asset_type, purchase_cost, model } = asset;

      if (!groupedAssets[asset_type]) {
        groupedAssets[asset_type] = { quantity: 0, value: 0, branches: [] };
      }

      groupedAssets[asset_type].quantity += 1;
      groupedAssets[asset_type].value += parseFloat(purchase_cost);
      groupedAssets[asset_type].branches.push({ model, cost: parseFloat(purchase_cost) });
    });

    return Object.keys(groupedAssets).map((assetType) => ({
      assetType,
      totalQuantity: groupedAssets[assetType].quantity,
      totalValue: groupedAssets[assetType].value,
      branches: groupedAssets[assetType].branches.map((branch) => branch.model).join(', '),
    }));
  };

  const stockData = getStockData();
  const grandTotalCost = stockData.reduce((total, data) => total + data.totalValue, 0);

  return (
    <div>
      <main className='main-container'>
        <h1 style={{ textAlign: 'center' }}>Stock View</h1>
        <div className="card-box-emp">
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Asset Type</th>
                <th>Total Quantity</th>
                <th>Branches</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((data, index) => (
                <tr key={index}>
                  <td>{data.assetType}</td>
                  <td>{data.totalQuantity}</td>
                  <td>{data.branches}</td>
                  <td>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(data.totalValue)}</td>

                </tr>
              ))}
            </tbody>
            <tfoot>
            <tr>
    <td colSpan="3" style={{ textAlign: 'right' }}><b>Grand Total:</b></td>
    <td><b>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(grandTotalCost)}</b></td>
  </tr>
            </tfoot>
          </table>
        </div>
      </main>
    </div>
  );
};

export default StockView;
