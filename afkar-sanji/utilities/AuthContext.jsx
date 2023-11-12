import React, { useState } from "react";
 
export const AuthContext =  React.createContext();

const AuthContextProvider = ({ children }) => {
    const [ PhoneNumber , SetPhoneNumber ] =  useState(null);
    const [ otpSMS , SetOTP ] = useState(null);
    const [ role , setRole ] = useState('question-api/questionnaires');
    const [ hasResume , setHasResume ] = useState(false);
    const [ userRole , setUserRole ] = useState(null);
    const [ isAdmin , setIsAdmin ] = useState(false);
    const InitialValue = {
         PhoneNumber : PhoneNumber , 
         changePhone : SetPhoneNumber ,
         SMSCode : otpSMS,
         ChangeOTP : SetOTP,
         isLoggedIn : false ,
         reqRole : role ,
         role : userRole,
         setUserRole : setUserRole,
         setReqRole : setRole ,
         hasResume : hasResume ,
         setHasResume : setHasResume ,
         isAdmin : isAdmin ,
         setIsAdmin : setIsAdmin
    }
    return <AuthContext.Provider value={InitialValue}>
        { children }
    </AuthContext.Provider>
}
export default AuthContextProvider;