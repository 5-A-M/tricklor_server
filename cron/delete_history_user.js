import cron from "node-cron"
import { dbconnection } from "../db/init.js"

const delete_history_user= ()=> {
    console.log("Start cron...")
    const task= cron.schedule("0 6 * * *", ()=> {
        dbconnection.collection("receipt").deleteMany({}, function(err, result) {
            if(err) throw err
            else {
                return result.deletedCount
            }
        })
    })
    task.start()

}

export default delete_history_user