import { Result } from "postcss";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import authCheck from "../authenticate";

const Thoughts = ( { thoughts, using } ) => {

  console.log(using)
  const route = useHistory()
  const [popup, setPopup] = useState(-1)
  const [context, setContext] = useState(0)

  useEffect(() => {

    async function check() {
      let loggedIn = await authCheck()
      if(!loggedIn){
        route.push('/login')
      }
    }
    // check()

  }, [])

  return (<div className='w-[77%]' >
    <h1 className="text-blue-400 text-4xl font-bold p-12">
      Latest thoughts..

      {thoughts.length !== 0 ? thoughts.map((thought) => {

          return (

            <div className="p-8 bg-gray-100 rounded-2xl shadow-2xl m-8 transition-all 
            hover:bg-blue-400 hover:transition-all hover:scale-95">

              <div className="flex text-2xl font-bold text-gray-600 transition:all hover:transition:all">
                <div className="flex-1" 
                  onClick={() => {

                    localStorage.setItem('thought', thought._id)
                    route.push('/thought')
                  
                  }}>{thought.title}</div>
                <div style={{ backgroundImage: 'url(https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/dots-vertical-512.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                padding: '12px'
              }}
                id={thought._id}
                onClick={() => popupModal(thought._id, setPopup, setContext, context)}
              >
                
                { popup === thought._id && thought.by === using.name.givenName ? 
                  (
                   <div className="absolute text-xs flex-col bg-white rounded-sm shadow-xl">

                    <div className="shadow-xl py-1 px-2 hover:bg-green-500 hover:text-white bg-white cursor-pointer">
                      Edit
                    </div>

                    <div onClick={() => delThought(thought._id)} className="shadow-xl py-1 px-2 hover:bg-red-500 hover:text-white bg-white cursor-pointer">
                      Delete
                    </div>

                    <div className="shadow-xl py-1 px-2 hover:bg-slate-500 hover:text-white bg-white cursor-pointer">
                      Tag
                    </div>

                   </div>
                  )
                    : 
                  (
                    popup === thought._id && thought.by !== using.name.givenName ? 
                    (
                      <div className="absolute text-xs flex-col bg-white rounded-sm shadow-xl">

                        <div className="shadow-xl py-1 px-2 hover:bg-slate-500 hover:text-white bg-white cursor-pointer">
                          Hide
                        </div>

                      </div>
                    )
                    : ('')
                      
                  )

                }

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

function popupModal(id, setPopup, setContext, context){

  if(context % 2 === 0){
    setContext(context++)
    setPopup(id)
  }
  else{
    setContext(context++)
    setPopup(-1)  
  }
  
}

async function delThought(id){

  fetch('https://thoughtscloud.vercel.app/thought/'+id, {
    method: 'DELETE'
  })
  .then(() => {
    //Rerender component... 
    //This reloads the complete page...
    window.location.reload()
  })
  

}

export default Thoughts;