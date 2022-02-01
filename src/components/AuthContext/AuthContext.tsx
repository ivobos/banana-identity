import React from "react";
import {CognitoUser, CognitoUserPool, CognitoUserSession, ICognitoStorage} from "amazon-cognito-identity-js";

interface AuthContextType {
    cognitoStorage: ICognitoStorage,
    userPool: CognitoUserPool,
    cognitoUser?: CognitoUser,
    setCognitoUser: (user: CognitoUser) => void
    cognitoUserSession?: CognitoUserSession,
    setCognitoUserSession: (session: CognitoUserSession) => void
    updateId: number
    setAuthContextChangedInternally: () => void
}

let AuthContext = React.createContext<AuthContextType>(null!);
export default AuthContext;