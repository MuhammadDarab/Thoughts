import { Result } from "postcss";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import authCheck from "../authenticate";

const Thoughts = ( { thoughts, using } ) => {

  const route = useHistory()

  useEffect(() => {

    async function check() {
      let loggedIn = await authCheck()
      console.log(loggedIn)
      if(!loggedIn){
        route.push('/login')
      }
    }
    check()

  }, [])

  return (<div className='w-[77%]' >
    <h1 className="text-blue-400 text-4xl font-bold p-12">
      Latest thoughts..

      {thoughts.length !== 0 ? thoughts.map((thought, id) => {

          return (

            <div className="p-8 bg-gray-100 rounded-2xl shadow-2xl m-8 transition-all 
            hover:bg-blue-400 hover:transition-all hover:p-10" onClick={() => {

              localStorage.setItem('thought', thought._id)
              route.push('/thought')
            
            }}>

              <div className="flex text-2xl font-bold text-gray-600 transition:all hover:transition:all">
                <div className="flex-1">{thought.title}</div>
                <div style={{ backgroundImage: 'url(https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/dots-vertical-512.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                padding: '12px'
              }}
                id={id}
              >
                
                {<div className="absolute text-xs flex-col bg-white rounded-sm shadow-xl">

                  <div className="shadow-xl py-1 px-2 hover:bg-red-500 hover:text-white bg-white cursor-pointer">
                    Delete
                  </div>

                  <div className="shadow-xl py-1 px-2 hover:bg-blue-500 hover:text-white bg-white cursor-pointer">
                    Pin
                  </div>

                  <div className="shadow-xl py-1 px-2 hover:bg-slate-500 hover:text-white bg-white cursor-pointer">
                    Hide
                  </div>

                </div>}

                </div>
              </div>
              <div className="text-gray-500 text-sm  transition:all hover:transition:all hover:text-white break-words">
                {thought.description}
              </div>
              <div className="text-gray-500 text-sm transition:all hover:transition:all hover:text-white font-light flex">
              <div className='p-3 bg-blue-400 w-fit rounded-full shadow-lg cursor-pointer' style={{ backgroundImage: `url(${thought.img})`, backgroundSize: 'cover' }}></div>
              
              <Link className="text-blue-800 text-md transition:all hover:transition:all pl-1" to={'/profile/'+thought.by}>@{thought.by}
              </Link>
              
              <div className="pl-1"> shared a thought on {thought.date.slice(0, 10)}</div>
            </div>

            </div>

          )

      }) : <div className="p-12 text-slate-500">Loading, Please Wait!...</div>}

    </h1>

      <Link to={'/create-blogs'}>
        <div className='p-8 m-12 bg-blue-400 w-fit rounded-full shadow-lg cursor-pointer fixed bottom-0'>
          ➕
        </div>      
      </Link>    

  </div>);

}

export default Thoughts;