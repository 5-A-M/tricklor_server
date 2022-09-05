import formidable from 'formidable'
import fs from "fs"
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { dbconnection } from '../db/init.js';
import { v4 } from 'uuid';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const upload_file_gmail = (req, res) => {
    
    const form= new formidable.IncomingForm()
    form.parse(req, function(err, fields, files) {
        const oldpath= files.file.filepath
        const newpath= __dirname + files.file.originalFilename
        fs.rename(oldpath, newpath, function(err) {
            if(err) throw err
            const text= fs.readFileSync(__dirname + files.file.originalFilename).toString('utf-8')
            const text_by_line= text.split("\n")
            const newArray= []
            text_by_line.map(item=> {
                let a= {account: item.split("|")[0], password: item.split("|")[1], id: v4(), name: fields.name}
                return newArray.push(a)
                
            })
            dbconnection.collection("product_gmail").insertMany(newArray, function(err, result) {
                if(err) throw err
                return res.status(200).json({message: "Đăng sản phẩm thành công", count: result.insertedCount})
            })
            fs.unlink(__dirname + files.file.originalFilename, function(err) {
                if(err) throw err
            })
        })
    })
}

export default upload_file_gmail