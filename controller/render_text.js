// import fs from "fs"
// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const render_text= (req, res)=> {
    // fs.appendFileSync(path.join(__dirname+"/text/file.txt"), "giang\nvip", function(err) {
    //     return console.log(err)
    // })
    const text= "Giang\nvip"
    res.setHeader('Content-type', 'application/octet-stream')
    res.setHeader('Content-disposition', 'attachment', 'filename=file.txt')
    return res.status(200).send(text)
}

export default render_text