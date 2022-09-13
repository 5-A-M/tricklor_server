import { dbconnection } from "../db/init.js"

const update_admin_option= (req, res)=> {
    dbconnection.collection("admin_option").updateOne({}, {$set: {title: req.body.title, banner: req.body.banner, logo: req.body.logo, hotline: req.body.hotline, email: req.body.email, bank_account: req.body.bankAccount, name_bank: req.body.bank, name_bank_account: req.body.nameBankAccount, logo_bank: req.body.logoBank, name_bank: req.body.nameBank, notification_admin: req.body.notificationAdmin, color_code: req.body.colorCode, background_web: req.body.backgroundWeb}}, function(err, result) {
        if(err) throw err
        res.status(200).json({message: "Cập nhật thành công", update: true})
    })
}

export default update_admin_option
