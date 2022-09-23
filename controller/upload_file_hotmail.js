import formidable from 'formidable'
import fs from "fs"
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { dbconnection } from '../db/init.js';
import { v4 } from 'uuid';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const upload_file_hotmail = (req, res) => {
    
    const a= []
    if(req.body.data) {
        req.body.data.split("\n").map(item=> a.push({account: item.split("|")?.[0], password: item.split("|")?.[1], id: v4(), name: req.body.name}))
    }
    dbconnection.collection("product").insertMany(a, function(err, result) {
        if(err) throw err
        else {
            return res.json({inserted: result.insertedCount})
        }
    })
}

export default upload_file_hotmail