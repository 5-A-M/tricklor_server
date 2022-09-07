import fetch from "node-fetch"

const check_payment= async (req, res)=> {
    const response= await fetch("https://oauth.casso.vn/v2/transactions?fromDate=2022-04-01&page=1&pageSize=20&sort=DESC", {headers: {
        'Content-Type': 'application/json',
        'Authorization': "Apikey AK_CS.9c2a8c602e5711ed81b149fc2c0f5c81.o3F5sEnl8s8N3n1EDI3m5fR1uMbXAn8aXmfkMiIfNiXjqg2niIqhGet2FYVSyhIc14K4IX1K"
    }})
    const body= await response.json()
    return res.status(200).json(body)

}

export default check_payment