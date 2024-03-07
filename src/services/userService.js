import db from '../models/index'
import bcrypt from 'bcrypt';

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);

            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'roleID', 'passWord', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true,
                    //   exclude:['passWord']
                });
                if (user) {
                    let check = bcrypt.compareSync(password, user.passWord)
                    if (check) {
                        userData.errCode = 0,
                            userData.errMessage = 'Login successed !',

                            delete user.passWord,
                            userData.user = user;
                    } else {
                        userData.errCode = 3,
                            userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2,
                        userData.errMessage = `User's data not found`
                }

            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in your system. Please try other email`
            }

            //   let jwt = createJWT(userData.user);
            //  userData.Token = jwt;
            //     userData.ExpireIn = process.env.EXPIRE_IN;

            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}
let hashUserPassword = (password) => {
   
    return new Promise(async (resolve, reject) => {
        try {
            if (!password) {
                reject(new Error('Password is required'));
                return;
            }
            const salt = await bcrypt.genSalt(10);
            let hashPassword = await bcrypt.hash(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}
let handleSignUp = (dataUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataUser.email || !dataUser.password || !dataUser.fullName) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let checkAccount = {};

                checkAccount = await db.User.findOne({
                    where: {
                        email: dataUser.email,
                    }
                })
                if (checkAccount) {
                    resolve({
                        errCode: -1,
                        errMessage: "Your Email already exist!"
                    })
                } else {
                    let hashPasswordfrombcrypt = await hashUserPassword(dataUser.password);
                    await db.User.create(
                        {
                            email: dataUser.email,
                            passWord: hashPasswordfrombcrypt,
                            firstName: dataUser.fullName
                        })
                    resolve({
                        errCode: 0,
                        errMessage: 'Create a new account success!'
                    })
                }

            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin, handleSignUp
}