import cron from "node-cron"

const test_cron= ()=> {
    console.log("Test cron start...")
    const task= cron.schedule(`15 23 * * *`, function(err, result) {
        return console.log("done")
    }, {scheduled: false})
    task.start()
}

export default test_cron