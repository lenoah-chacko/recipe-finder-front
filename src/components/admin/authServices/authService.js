async function verifyToken(token) {
    
    const response = await fetch('http://localhost:4000/api/verify-login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json', // The type of data you're sending
            'authorization':"Bearer "+token
        },
    })
    const data = await response.json();
    console.log("API",data)
    if(!data.auth || data.auth==false)
    {
        return "unauthorized"
    }
    else if(data.auth==true)
    {
        return "authorized"
    }
}

async function AuthService(){
    let token
    token=(localStorage.getItem("token"))
    if(!token)
    {
        return "unauthorized"
    }    
    else
    {
        let auth
        auth=await verifyToken(token)
        console.log("returning token",auth)
        return auth
    }
}
export default AuthService