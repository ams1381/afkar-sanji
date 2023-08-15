import React, { useState } from "react";
 
export const AuthContext =  React.createContext();

const AuthContextProvider = ({ children }) => {
    const [ PhoneNumber , SetPhoneNumber ] =  useState(null);
    const [ otpSMS , SetOTP ] = useState(null);
    const InitialValue = {
         PhoneNumber : PhoneNumber , 
         changePhone : SetPhoneNumber ,
         SMSCode : otpSMS,
         ChangeOTP : SetOTP,
         isLoggedIn : false
    }
    return <AuthContext.Provider value={InitialValue}>
        { children }
    </AuthContext.Provider>
}
export default AuthContextProvider;