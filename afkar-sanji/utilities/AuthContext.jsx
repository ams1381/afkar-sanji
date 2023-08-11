import React, { useState } from "react";
 
export const AuthContext =  React.createContext();

const AuthContextProvider = ({ children }) => {
    const [ PhoneNumber , SetPhoneNumber ] =  useState(null);

    return <AuthContext.Provider value={{ PhoneNumber : PhoneNumber , changePhone : SetPhoneNumber }}>
        { children }
    </AuthContext.Provider>
}
export default AuthContextProvider;