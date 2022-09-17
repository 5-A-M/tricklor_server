import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectMongo from "./db/init.js"
import signup from "./controller/signup.js"
import login from "./controller/login.js"
import index from "./controller/index.js"
import change_password from "./controller/change_password.js"
import get_option from "./controller/get_option.js"
import update_admin_option from "./controller/update_admin_option.js"
import recharge_manual from "./controller/recharge_manual.js"
import add_service_hotmail from "./controller/add_service_hotmail.js"
import add_service_gmail from "./controller/add_service_gmail.js"
import get_service_hotmail from "./controller/get_service_hotmail.js"
import get_service_gmail from "./controller/get_service_gmail.js"
import upload_file_hotmail from "./controller/upload_file_hotmail.js"
import upload_file_gmail from "./controller/upload_file_gmail.js"
import buy_account from "./controller/buy_account.js"
import { Server } from "socket.io"
import { createServer } from "http"
import get_receipt from "./controller/get_receipt.js"
import buy_account_gmail from "./controller/buy_account_gmail.js"
import dateFormat from "dateformat"
import querystring from "qs"
import crypto from "crypto"
import get_user from "./controller/get_user.js"
import delete_service_gmail from "./controller/delete_service_gmail.js"
import delete_service_hotmail from "./controller/delete_service_hotmail.js"
import check_payment from "./controller/check_payment.js"
import login_admin from "./controller/login_admin.js"
import reset_password from "./controller/reset_password.js"
import exist_account from "./controller/exist_account.js"
import reset_admin from "./controller/reset_admin.js"
import { reset_service } from "./controller/reset_service.js"
import detail_order_history from "./controller/detail_order_history.js"
import get_token_qr_code from "./controller/get_token_qr_code.js"
import remove_misscellaneous from "./controller/remove_misscellaneous.js"
import render_text from "./controller/render_text.js"
import { v4 } from "uuid"
import send_mail_verify from "./background/send_mail_verify.js"
import get_user_2fa from "./controller/get_user_2fa.js"
import get_sum_profile_7_days from "./controller/get_sum_profile_7_days.js"
import get_sum_subscribe_7_days from "./controller/get_sum_subscribe_7_days.js"
import history_admin from "./controller/history_admin.js"
import get_amount_product from "./controller/get_amount_product.js"
// import multer from "multer"
// const upload= multer()

dotenv.config()

const app= express()
const httpServer= createServer(app)
const io= new Server(httpServer, {
    cors: "*"
})
app.use(cors())
app.use(express.json())
// app.use(upload.array())
app.use(express.urlencoded({
    extended: true
}))

app.post("/signup", signup)
app.post("/login", login)
app.post("/change_password", change_password)
app.post("/get_option/main", get_option)
app.post("/update/admin_option", update_admin_option)
app.post("/recharge/manual", recharge_manual)
app.post("/", index)
app.post("/edit/add/hotmail", add_service_hotmail)
app.post("/edit/add/gmail", add_service_gmail)
//
app.get("/edit/get/hotmail", get_service_hotmail)
app.get("/edit/get/gmail", get_service_gmail)
//
app.post("/upload_file/hotmail", upload_file_hotmail)
app.post("/upload_file/gmail", upload_file_gmail)
app.post("/buy/account", buy_account)
app.post("/buy/account/gmail", buy_account_gmail)
app.get("/history", get_receipt)
app.get("/get_user", get_user)
app.post("/edit/delete/gmail", delete_service_gmail)
app.post("/edit/delete/hotmail", delete_service_hotmail)
app.post("/check/payment", check_payment)
app.post("/login/admin", login_admin)
app.post("/reset/password", reset_password)
app.post("/check_exist/account", exist_account)
app.post("/admin/reset", reset_admin)
app.post("/reset/gmail", reset_service.reset_service_gmail)
app.post("/reset/hotmail", reset_service.reset_service_hotmail)
app.get("/detail_order/history", detail_order_history)
app.post("/token/qr", get_token_qr_code)
app.get("/remove/miscellaneous", remove_misscellaneous)
app.post("/render/text", render_text)
app.post("/auth/verify", send_mail_verify)
app.post("/2fa/user", get_user_2fa)
app.post("/stats/sum/profit", get_sum_profile_7_days)
app.post("/stats/sum/subscribe", get_sum_subscribe_7_days)
app.post("/ad/history", history_admin)
app.get("/get/amount/product", get_amount_product)

app.post('/create_payment_url', function (req, res, next) {
    var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var tmnCode = "9FZVLYLC";
    var secretKey = "MEJRIRHWXZLNKQAIOPZLVNNPMEVTFHQX";
    var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    var returnUrl = "http://localhost:3000/VnPayReturn";
    var date = new Date();

    var createDate = dateFormat(date, 'yyyymmddHHmmss');
    var orderId = dateFormat(date, 'HHmmss');
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;
    
    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if(locale === null || locale === ''){
        locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }
    vnp_Params = sortObject(vnp_Params);
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    res.status(200).json({url: vnpUrl})
});
function sortObject(obj) {
	var sorted = {};
	var str = [];
	var key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
io.on("connection", (socket)=> {
    // console.log(socket.id)
    socket.on("join_room", (data)=> {
        console.log(data.id_room)
        socket.join(data.id_room)
        // console.log(io.sockets.adapter.rooms.get(data.id_room))
        // console.log(io.sockets.adapter.rooms.get(data.id_room).size)
        if(io.sockets.adapter.rooms.get(data.id_room).size > 1) {
            io.to(data.id_room).emit("verify1", {is_verify_1: true, token: v4()})
        }
    })
    // login oauth2
    socket.on("login_auth2", (data)=> {
        socket.join(data.roomId)
        if(io.sockets.adapter.rooms.get(data.roomId).size > 1 ) {
            io.to(data.roomId).emit("twoFa", {is_verify: true, token: v4()})
        } 
    })
    // update amount
    socket.on("update_amount", data=>{ 
        let newAmount= parseInt(data.amount) - 1
        io.emit("update_amount_from_server", {amount: newAmount})
    })
})

connectMongo()

httpServer.listen(process.env.PORT || 4001, ()=> console.log("Server run port "+process.env.PORT || 4001))