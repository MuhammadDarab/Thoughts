const authCheck = async () => {

    let Auth = false
    let resp = await fetch('https://thoughtscloud.vercel.app/auth/login/success', {
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
    result.success === true ? Auth = true : Auth = false;

    return Auth
   
}

export default authCheck;