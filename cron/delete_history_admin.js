import cron from "node-cron"
import { dbconnection } from "../db/init.js"

const delete_history_admin= (req, res)=> {
    dbconnection.collection("cron").updateOne({}, {$set: {cron: true, time: {hour: req.body.hour, minute: req.body.minute}}}, (err)=> {
        if(err) throw err
        else {
            const task= cron.schedule(`${req.body.minute || "*"} ${req.body.hour || "*"} * * *`, function(err, result) {
                dbconnection.collection("stats").deleteMany({type: "history"}, (err, result)=> {
                    console.log(100)
                    if(err ) throw err
                    else {
                        dbconnection.collection("cron").updateOne({}, {$set: {cron: false, time: {hour: -1, minute: -1}}}, (err, result1)=> {
                            if(err) throw err
                        })
                    }
                })
            })
            task.start()
            return res.status(200).json({hour: req.body.hour, minute: req.body.minute, cron: true})
        }
    })
}

export default delete_history_admin