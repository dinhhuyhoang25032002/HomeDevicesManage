require('dotenv').config();
import nodemailer from 'nodemailer'

let checkActivityEmail = async (dataSend) => {
    // console.log('check dataSend', dataSend)
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP_USER,
            pass: process.env.EMAIIL_APPP_PASSWORD

        }
    });
    await transporter.sendMail({
        from: '"Homecare" từ quản trị viên <Homecare@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Thông tin tài khoản yêu cầu cấp lại mật khẩu", // Subject line
        // plain text body
        html: contentHTML(dataSend),  // html body
    });

}
let contentHTML = (dataSend) => {
    let result = '';
    result =
        ` <h3>Xin chào ${dataSend.fullName}!</h3>
        <p>Bạn nhận được email này là do đã thực hiện việc đặt lại mật khẩu trên <a href ='https://bookingcare.vn/'>Homecare.vn<a></p>
        <div><b>Thông tin tài khoản:</b></div>
        <div><b>Họ và tên: ${dataSend.fullName}</b></div>
        <div><b>Tài khoản email liên kết: ${dataSend.email}</b></div>
        <div>Mật khẩu đặt lại: ${dataSend.passWord}</div>
        <p>Thời điểm bạn nhận được email này mật khẩu của bạn đã được đặt lại trên hệ thống. Vui lòng cập nhật mật khẩu khác để tránh các vấn đề rủi ro về bảo mật.</p>
        <br>
        <div>Xin chân thành cảm ơn bạn!<div>`
    return result;
}
module.exports = {
    checkActivityEmail
}