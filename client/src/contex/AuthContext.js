import React, { useState } from 'react'
const CRMContext = React.createContext()
const CRMProvider = ({children}) => {
    const [auth, setAuth] = useState({
        token: '',
        isAuth: false
    })
    return (
        <CRMContext.Provider value={[auth, setAuth]}>
            {children}
        </CRMContext.Provider>
    )
}

export {
    CRMContext,
    CRMProvider
}
