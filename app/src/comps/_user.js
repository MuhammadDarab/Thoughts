import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import authCheck from "../authenticate";

const User = ({ getUsing }) => {

    const route = useHistory()

    // useEffect(() => {

    //   async function check() {
    //     let loggedIn = await authCheck()
    //     console.log(loggedIn)
    //     if(!loggedIn){
    //       route.push('/login')
    //     }
    //   }
    //   // check()

    // }, [])

    const [user, setUser] = useState(null);
    const [settings, setSettings] = useState(false);

    useEffect(() => {
  
      const getUser = async () => {
  
        fetch('http://192.168.100.14:8080/auth/login/success', {
          method: 'GET',
          // credentials: 'include',
          headers: {
            Accept: 'application/json',
            "Content-Type" : "application/json",
            // "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(resp => resp.json())
        .then(result => {
          setUser(result.user)
          getUsing(result.user)
        })
        
        user ? console.log(user) : console.log("not here yet")
  
      }
      getUser();

    }, [])

    return (
        <div className='p-8 m-12 bg-blue-400 w-fit rounded-full shadow-lg cursor-pointer fixed bottom-0 right-0' style={{ backgroundImage: `url(${user?.photos[0]?.value})`, backgroundSize: 'cover' }} onClick={() => {
            setSettings(!settings)
        }}>

        <div className="bg-lime-600 p-2 rounded-full shadow-lg cursor-pointer absolute bottom-0 left-0">
        </div>

        { settings ?
        <div className="absolute bottom-0 -left-16 bg-white text-center flex">
            <Link to="/account">
            <div className="w-4 m-1 p-2" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/6/6d/Windows_Settings_app_icon.png")',
                backgroundSize: 'contain',
                backgroundRepeat : 'no-repeat',
                backgroundPosition : 'center'
            }}></div>
            </Link>
            <div className="w-4 h-4 m-1 p-2" style={{ backgroundImage: 'url("https://cdn-icons-png.flaticon.com/512/126/126467.png")',
                backgroundSize: 'contain',
                backgroundRepeat : 'no-repeat',
                backgroundPosition : 'center'
            }}
            onClick={() => {
                window.open('http://192.168.100.14:8080/auth/logout', '_self')
            }}
        ></div>

        </div>
        : null }

        </div>  
    );
}
 
export default User;