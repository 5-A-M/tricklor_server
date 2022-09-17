import _ from "lodash"
import moment from "moment"
import { dbconnection } from "../db/init.js"

const get_sum_profile_7_days= (req, res)=> {
    let d7= 0, d6= 0, d5=0, d4=0, d3=0, d2=0, d1=0
    const sp= []
    dbconnection.collection("stats").find({type: "recharge", date: moment(new Date()).subtract(0, 'day').format("DD-MM-YYYY")}).toArray(function(err, result) {
        if(err) throw err
        d7= _.sumBy(result, function(o) { return o.balance })
        sp.push(d7)
        dbconnection.collection("stats").find({type: "recharge", date: moment(new Date()).subtract(1, 'day').format("DD-MM-YYYY")}).toArray(function(err, result) {
            if(err) throw err
            d6= _.sumBy(result, function(o) { return o.balance })
            sp.push(d6)
            dbconnection.collection("stats").find({type: "recharge", date: moment(new Date()).subtract(2, 'day').format("DD-MM-YYYY")}).toArray(function(err, result) {
                if(err) throw err
                d5= _.sumBy(result, function(o) { return o.balance })
                sp.push(d5)
                dbconnection.collection("stats").find({type: "recharge", date: moment(new Date()).subtract(3, 'day').format("DD-MM-YYYY")}).toArray(function(err, result) {
                    if(err) throw err
                    d4= _.sumBy(result, function(o) { return o.balance })
                    sp.push(d4)
                    dbconnection.collection("stats").find({type: "recharge", date: moment(new Date()).subtract(4, 'day').format("DD-MM-YYYY")}).toArray(function(err, result) {
                        if(err) throw err
                        d3= _.sumBy(result, function(o) { return o.balance })
                        sp.push(d3)
                        dbconnection.collection("stats").find({type: "recharge", date: moment(new Date()).subtract(5, 'day').format("DD-MM-YYYY")}).toArray(function(err, result) {
                            if(err) throw err
                            d2= _.sumBy(result, function(o) { return o.balance })
                            sp.push(d2)
                            dbconnection.collection("stats").find({type: "recharge", date: moment(new Date()).subtract(6, 'day').format("DD-MM-YYYY")}).toArray(function(err, result) {
                                if(err) throw err
                                d1= _.sumBy(result, function(o) { return o.balance })
                                sp.push(d1)
                                return res.status(200).json({data: sp.reverse(), sum: _.sum(sp)})
                            })
                        })
                    })
                })
            })
        })
    })
    
    
    
    
    
    
    
}

export default get_sum_profile_7_days