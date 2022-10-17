import { v4 } from "uuid"
import { dbconnection } from "../db/init.js"

const up_any_service= (req, res)=> {
    const a= []
    if(req.body.data) {
        req.body.data.split("\n").map(item=> a.push({account: item.split("|")?.[0], password: item.split("|")?.[1], full_account: item, id: v4(), name: req.body.name}))
    }
    dbconnection.collection("product").insertMany(a, function(err, result) {
        if(err) throw err
        else {
            return res.json({inserted: result.insertedCount})
        }
    })
    // dbconnection.collection("product").insertMany({})
}

export default up_any_service