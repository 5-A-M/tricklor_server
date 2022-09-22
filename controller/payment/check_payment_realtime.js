import axios from "axios"

const check_payment_realtime= async (data, socket, io)=> {
    setInterval( async()=> {
        const res= await axios({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Apikey ${data.api_payment}`
            },
            url: "https://oauth.casso.vn/v2/transactions?fromDate=2022-04-01&page=1&pageSize=20&sort=DESC",
            method: "get",
            responseType: "json",
        })
        const result= await res.data
        socket.emit("check_payment_to_client", {data: result.data.records[0]})
    }, 7000)
}

export default check_payment_realtime