/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");
const wrapper = require("../utils/response");
const { Register, getClientID } = require("../models/r_user");

module.exports = {
  Register: async (request, response) => {
    try {
      const { username, clientid, password } = request.body;

      // PROSES VALIDASI PASSWORD
      if (password.length < 6) {
        return wrapper.response(response, 400, "password At Least 6 Character ", null);
      }

      //  PROSES HASH PASSWORD
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          console.log(err);
        }
        const setUser = {
          username,
          clientid,
          password: hashedPassword,
        };

        // PROSES PENGECEKAN DUPLIKAT EMAIL
        const checkClientID = await getClientID(clientid);
        if (checkClientID.data.length > 0) {
          return wrapper.response(response, 403, "You Have Been Registered", null);
        }

        const result = await Register(setUser);
        return wrapper.response(response, result.status, " Register Success ", result.data);
      });
    } catch (error) {
      console.log(error);
      const { status = 500, statusText = "Internal Server Error", error: errorData = null } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },

  //   login: async (request, response) => {
  //     try {
  //       const { userid, password } = request.body;

  //       // PROSES PENGECEKAN EMAIL
  //       const checkEmail = await getUserByEmail(email);
  //       if (checkEmail.data.length < 1) {
  //         return wrapper.response(response, 404, "Email is Not Registed", null);
  //       }

  //       //  PROSES PENCOCOKAN PASSWORD
  //       const isSame = await bcrypt.compare(password, checkEmail.data[0].password).then((result) => result);
  //       if (!isSame) {
  //         return wrapper.response(response, 400, "Wrong Password", null);
  //       }

  //       const payload = {
  //         user_id: checkEmail.data[0].id,
  //       };
  //       const token = jwt.sign(payload, process.env.SECRET_KEY, {
  //         expiresIn: "1d",
  //         issuer: process.env.ISSUER,
  //       });
  //       const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, {
  //         expiresIn: "3d",
  //         issuer: process.env.ISSUER,
  //       });

  //       const result = {
  //         payload,
  //         token,
  //         refreshToken,
  //       };

  //       new Promise((resolve, reject) => {
  //         supabase
  //           .from("token")
  //           .insert([{ token_login: token }])
  //           .then((result) => {
  //             if (!result.error) {
  //               resolve(result);
  //             } else {
  //               reject(result);
  //             }
  //           });

  //         return wrapper.response(response, 200, "Login Success", result);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       const { status = 500, statusText = "Internal Server Error", error: errorData = null } = error;
  //       return wrapper.response(response, status, statusText, errorData);
  //     }
  //   },

  //   logout: async (request, response) => {
  //     try {
  //       const token = request.header("x-access-token");
  //       console.log(token);
  //       await logout(token);

  //       return wrapper.response(response, 200, "Logout Success!");
  //     } catch (error) {
  //       console.log(error);
  //       const { status = 500, statusText = "Internal Server Error", error: errorData = null } = error;
  //       return wrapper.response(response, status, statusText, errorData);
  //     }
  //   },
  //   refresh: async (request, response) => {
  //     try {
  //       const { refreshToken } = request.body;

  //       if (!refreshToken) {
  //         return wrapper.response(response, 400, "Refresh Token Cannot be Empty !");
  //       }

  //       let payload;
  //       let token;
  //       let newRefreshToken;
  //       jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH, (err, res) => {
  //         if (err) {
  //           return wrapper.response(response, 400, "Refresh Token Cannot be Empty !");
  //         }
  //         payload = {
  //           user_id: res.user_id,
  //         };

  //         token = jwt.sign(payload, process.env.SECRET_KEY, {
  //           expiresIn: "1d",
  //           issuer: process.env.ISSUER,
  //         });

  //         newRefreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, {
  //           expiresIn: "3d",
  //           issuer: process.env.ISSUER,
  //         });
  //       });
  //       return wrapper.response(response, 200, "Success Refresh Token!", {
  //         user_id: payload.user_id,
  //         token,
  //         refreshToken: newRefreshToken,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       const { status = 500, statusText = "Internal Server Error", error: errorData = null } = error;
  //       return wrapper.response(response, status, statusText, errorData);
  //     }
  //   },
};
