import translate from "translate-google"

const translate1= (req, response)=> {
    translate(req.body.translate, {to: "en"})
    .then(res=> response.status(200).json({result: res}))
    .catch(err=> response.status(200).json({result: req.body.translate}))
}

export default translate1