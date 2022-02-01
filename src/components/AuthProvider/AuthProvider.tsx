import React, {useState} from "react";
import {CognitoUser, CognitoUserPool, CognitoUserSession, CookieStorage} from "amazon-cognito-identity-js";
import AuthContext from "../AuthContext";

let AuthProvider = ({ userPoolId, clientId, children}: { userPoolId: string, clientId: string, children: React.ReactNode} ) => {
    const [cognitoStorage] = useState(new CookieStorage({secure: false, domain: "ivobos.com"}));
    const [updateId, setUpdateId] = useState(0);
    const [userPool] = useState(new CognitoUserPool({
        UserPoolId : userPoolId,
        ClientId : clientId,
        Storage: cognitoStorage
    }));
    const [cognitoUser, setCognitoUser] = useState<CognitoUser>(userPool.getCurrentUser()!);
    const [cognitoUserSession, setCognitoUserSession] = useState<CognitoUserSession>(null!);
    if (cognitoUser && !cognitoUserSession) {
        cognitoUser.getSession((error: Error | null, session: CognitoUserSession | null) => {
            if (error) {
                console.log(error);
            }
            if (session) {
                setCognitoUserSession(session);
            }
        });
    }
    const value = {
        cognitoStorage: cognitoStorage,
        userPool: userPool,
        cognitoUser: cognitoUser,
        setCognitoUser: setCognitoUser,
        cognitoUserSession: cognitoUserSession,
        setCognitoUserSession: setCognitoUserSession,
        updateId: updateId,
        setAuthContextChangedInternally: () => setUpdateId(prevUpdateId => prevUpdateId + 1)
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;