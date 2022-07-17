import env from "./env";

const authCheck = async () => {

    let Auth = false
    let resp = await fetch('https://thoughtsbackend.vercel.app' + '/auth/login/verify', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          "Content-Type" : "application/json",
          "Access-Control-Allow-Credentials" : true,
          "Access-Control-Allow-Origin": "*"
        }
    })
    let result = await resp.json()
    if(result.success === true){
        Auth = true;
    }

    return Auth
   
}

export default authCheck;