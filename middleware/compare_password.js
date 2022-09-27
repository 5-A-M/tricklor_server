const compare_password= (req, res, next)=> {
    if(req.body.password !== req.body.confirmPassword) {
        return res.status(200).json({message: "Mật khẩu không khớp, vui lòng thử lại", reset: false})
    }
    else {
        next()
    }
}

export default compare_password