import translate from "google-translate-api"

const translate1= (req, response)=> {
    translate(req.body.translate, {to: "en"})
    .then(res=> response.status(200).json({result: res.text}))
    .catch(err=> response.status(200).json({result: req.body.translate}))
}

export default translate1