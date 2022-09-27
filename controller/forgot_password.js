import nodemailer from "nodemailer";
import _ from "lodash";
import { dbconnection } from "../db/init.js";

const forgot_password = async (req, res) => {
  dbconnection
    .collection("verify_code")
    .deleteMany({ account: req.body.account }, async function (err, result) {
      if (err) throw err;
      else {
        const codeVerify = _.round(_.random(100000, 999999, 1));
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "thaipt626@gmail.com",
            pass: "uucbtuwgtnngzniz",
          },
        });
        const mailOptions = {
          from: "thaipt626@gmail.com",
          to: req.body.email,
          subject: "Verification code",
          html: `<div><div>Đây là mã xác thực thay đổi mật khẩu của bạn, Vui lòng không chia sẻ cho bất cứ ai, Mã sẽ hết hạn trong vòng 3 phút</div>
                    <strong style="text-align: center">${codeVerify}</strong>
                </div>`,
        };
        try {
          const response = await transporter.sendMail(mailOptions);
          dbconnection
            .collection("verify_code")
            .insertOne(
              { account: req.body.account, code: codeVerify, time: new Date() },
              (err, result) => {
                if (err) throw err;
              }
            );
          console.log(response.response);
        } catch (error) {
          console.log(error);
        }
        setTimeout(() => {
          dbconnection
            .collection("verify_code")
            .deleteMany({ account: req.body.account }, function (err, result) {
              if (err) throw err;
            });
        }, 1000 * 180);
        return res
          .status(200)
          .json({
            message:
              "Chúng tôi vừa gửi một mã xác thực đến email của bạn, vui lòng nhập mã xác thực vào ô bên dưới",
            verify: "pending",
          });
      }
    });
};

export default forgot_password;
