import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectMongo, { dbconnection } from "./db/init.js"
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
import check_balance from "./controller/api/check_balance.js"
import buy_service from "./controller/api/buy_service.js"
import up_any_service from "./controller/up_any_service.js"
import check_payment_realtime from "./controller/payment/check_payment_realtime.js"
import forgot_password from "./controller/forgot_password.js"
import md5 from "md5"
import compare_password from "./middleware/compare_password.js"
import delete_history_user from "./cron/delete_history_user.js"
import delete_history_admin from "./cron/delete_history_admin.js"
import test_cron from "./cron/test_cron.js"
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
app.get("/api/user/balance", check_balance)
app.get("/api/user/buy", buy_service)
app.post("/up/any/service", up_any_service)
app.post("/create/new_service", (req, res)=> {
    dbconnection.collection("new_service").insertOne({title: req.body.title, menu: req.body.menu, id_service: v4()}, function(err, result) {
        if(err) throw err
        else {
            return res.status(200).json({message: "success", status: 200})
        }
    })
})
app.get("/get/service", (req, res)=> {
    dbconnection.collection("new_service").find({}).toArray(function(err, result) {
        if(err) throw err
        else {
            return res.status(200).json({message: "success", data: result})
        }
    })
})

app.get("/get/account", (req, res)=> {
    dbconnection.collection("user").find({id_user: req.query.id_user}).toArray(function(err, result) {
        if(err) throw err
        else {
            return res.status(200).json({account: result[0]?.account || "Unknown"})
        }
    })
})

app.get("/find/history", (req, res)=> {
    dbconnection.collection("stats").find({code_stats: req.query.search.trim()}).toArray(function(err, result) {
        if(err) throw err
        else {
            return res.status(200).json({search: result})
        }
    })
})//
app.post("/create/d/service", (req, res)=> {
    dbconnection.collection("detail_service").insertOne({menu: req.body.menu, id_service: req.body.id_service, id_xxx: v4(), price: req.body.price, nation: req.body.nation}, function(err, result) {
        if(err) throw err
        else {
            return res.status(200).json({change: result.acknowledged})
        }
    })
})
//
app.get("/detail/c/service", (req, res)=> {
    dbconnection.collection("detail_service").find({id_service: req.query.id_service}).toArray(function(err, result) {
        if(err) throw err
        else {
            return res.status(200).json({data: result})
        }
    })
})
//
app.post("/delete/c/service", (req, res)=> {
    dbconnection.collection("detail_service").deleteOne({id_xxx: req.body.id_delete}, function(err, result) {
        if(err) throw err
        else {
            return res.status(200).json({delete: result.deletedCount})
        }
    })
})
//
app.post("/delete/a/service", (req, res)=> {
    dbconnection.collection("new_service").deleteOne({id_service: req.body.id_delete}, function(err) {
        if(err) throw err
        else {
            dbconnection.collection("detail_service").deleteMany({id_service: req.body.id_delete}, function(err, result) {
                if(err) throw err
                else {
                    return res.status(200).json({delete: result.deletedCount})
                }
            })
        }
    })
})
//
app.get("/get/c/service", (req, res)=> {
    dbconnection.collection("new_service").find({}).toArray(function(err, result) {
        if(err) throw err
        else {
            return res.status(200).json({data: result})
        }
    })
})
//
app.get("/get/c/service/detail", (req, res)=> {
    dbconnection.collection("detail_service").find({id_service: req.query.id_service}).toArray(function(err, result) {
        if(err) throw err
        else {
            return res.status(200).json({data: result})
        }
    })
})
//
app.post("/add/price/c/service", (req, res)=> {
    dbconnection.collection("new_service").updateOne({id_service: req.body.id_service}, {$set: {price: parseInt(req.body.price)}}, function(err, result) {
        if(err) throw err
        else {
            return res.status(200).json({data: result})
        }
    })
})
//
app.post("/up/c/payment", (req, res)=> {
    dbconnection.collection("payment_list").insertOne({id :req.body.id, time: req.body.time}, function(err, result) {
        if(err) throw err
        return res.status(200).json({message: "success"})
    })
})
//
app.get("/get/c/payment", (req, res)=> {
    dbconnection.collection("payment_list").find({}).sort({time: -1}).toArray(function(err, result) {
        if(err) throw err
        else {
            return res.status(200).json({id: result[0]?.id || "", time: result[0]?.time || ""})
        }
    })
})
//
// app.post("/forgot_password/c/back", forgot_password)
app.get("/find/c/email", (req, res)=> {
    dbconnection.collection("user").find({email: req.query.email}).toArray((err, result)=> {
        if(err) throw err
        else {
            const newResult= result.map(({account, id_user, ...info})=> ({account, id_user}))
            return res.status(200).json({data: newResult})
        }
    })
})
//
app.post("/get/code/c/forgot", forgot_password)
//
app.post("/verify/c/code", (req, res)=> {
   dbconnection.collection("verify_code").find({account: req.body.account}).toArray(function(err, result) {
    if(err) throw err
    else {
        if(result.length > 0) {
            if(parseInt(req.body.code) === parseInt(result[0].code)) {
                dbconnection.collection("verify_code").deleteMany({account: req.body.account}, function(err, result) {
                    if(err) throw err
                    res.status(200).json({data: {message: "Xác thực thành công.", verify: true}})
                })
            }
            else {
                res.status(200).json({data: {message: "Mã xác thực không chính xác hoặc đã hết hạn, Vui lòng thử lại", verify: false}})
            }
        }
        else {
            res.status(200).json({data: {message: "Lỗi không xác định", verify: false}})
        }
    }
   })
})
//
app.post("/reset/c/password", compare_password, (req, res)=> {
    dbconnection.collection("user").updateOne({account: req.body.account}, {$set: {password: md5(req.body.password)}}, function(err, result) {
        if(err) throw err
        else {
            return res.status(200).json({message: "Đặt lại mật khẩu thành công", reset: true})
        }
    })
})
//
app.post("/set/c/lang", (req, res)=> {
    dbconnection.collection("lang").updateOne({id_user: req.body.id_user}, {$set: {lang: req.body.lang}}, function(err, result) {
        if(err) throw err
        else if(result.modifiedCount <= 0 ) {
            dbconnection.collection("lang").insertOne({id_user: req.body.id_user, lang: req.body.lang}, function(err, result) {
                if(err) throw err
                else {
                    return res.status(200).json({message: "Thay đổi ngôn ngữ thành công", lang: req.body.lang})
                }
            })
        }
        else {
            return res.status(200).json({message: "Thay đổi ngôn ngữ thành công", lang: req.body.lang})
        }
    })
})
//
app.get("/cron/c/ad", (req, res)=> {
    dbconnection.collection("cron").findOne(function(err, result) {
        if(err) throw err
        else {
            return res.status(200).json({...result})
        }
    })
})
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
// cron
delete_history_user()
// test_cron()
// cron route control by admin

app.post("/delete/c/schedule", delete_history_admin)

// socket
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
        if(parseInt(data.amount) <=0 ) {
            return io.emit("update_amount_from_server", {amount: 0})
        }
        let newAmount= parseInt(data.amount) - parseInt(data.number)
        io.emit("update_amount_from_server", {amount: newAmount})
    })
    // check payment 
    socket.on("check_payment_from_server", data=> {
        check_payment_realtime(data, socket, io)
    })
})

connectMongo()

httpServer.listen(process.env.PORT || 4000, ()=> console.log("Server run port "+process.env.PORT || 4000))