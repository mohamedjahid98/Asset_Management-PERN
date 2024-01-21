const {Pool} = require("pg")

const sequelize= new Pool({
    user:"postgres",
    password:"Jahid123@",
    host:"localhost",
    port:5432,
    database:"Assets_management_system"

})

// node .\database.js 
// const createTBL=`CREATE TABLE ScrapAsset (
//     id serial PRIMARY KEY,
//     asset_type VARCHAR(255) NOT NULL,
//     scrap_date DATE NOT NULL,
//     reason VARCHAR(255) NOT NULL
// );
// `

// sequelize.query(createTBL).then((Response)=>{
//     console.log("Table created")
// console.log(Response)
// })

// .catch((err)=>{
//     console.log(err)
// })

module.exports=sequelize;