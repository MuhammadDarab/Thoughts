import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import authCheck from "../authenticate";
import env from "../env";

const Create = ({ using }) => {
    
    const [label, setLabel] = useState(false)
    const route = useHistory()

    useEffect(() => {
  
      async function check() {
        let loggedIn = await authCheck()
        console.log(loggedIn)
        if(!loggedIn){
          route.push('/login')
        }
      }
    //   check()
  
    }, [])

    return (

        <div className='w-[77%]' >
        
            <h1 className="text-blue-400 text-4xl font-bold p-12">
                Create New..
            </h1>

            <div className="pl-12">
                <i className="text-slate-500">@{using?.name?.givenName} says...</i>
            <br />
                <input id="title" type="text" placeholder="Title.." className="p-2 my-4 text-6xl rounded-xl shadow-xl"/>
            <br />
                <textarea id="description" cols="80" rows="10" placeholder="thought.." className="p-2 text-xl rounded-xl shadow-xl"></textarea>
            <br />

                <div className="flex mt-4">

                    <div className="border-2 border-blue-400 mr-4 w-fit p-4 text-blue-400 rounded-2xl shadow-2xl cursor-pointer" onClick={() => {
                        setLabel(!label)
                    }}>Add Label</div>
                    <div className="bg-blue-400 w-fit p-4 text-white rounded-2xl shadow-2xl cursor-pointer" onClick={() => {
                        postThought(route, using)
                    }}>Post!</div>

                </div>

            </div>

        </div>
    );

}
 
function postThought(route, using) {

    let title = document.querySelector('#title')
    let description = document.querySelector('#description')    

    const response = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
            title: title.value,
            description: description.value,
            by: using?.name?.givenName,
            date: new Date().getDate()
        }) // body data type must match "Content-Type" header
    }

    fetch('http://192.168.100.14:8080/thought', response)
    .then(() => route.push('/home'))
    .then(() => {
        window.location.reload()
    })

}

export default Create;