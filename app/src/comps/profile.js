import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import env from '../env';
import authCheck from '../authenticate';
import { useHistory } from 'react-router-dom';

const Profile = () => {

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

  const [profile, setProfile] = useState(null);

    useEffect(() => {
  
      const user = window.location.pathname.slice(9)
      console.log(user)
      const getProfile = async () => {
  
        fetch('https://thoughtsbackend.vercel.app' + '/profile/'+ user ,{
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            "Content-Type" : "application/json",
            "Access-Control-Allow-Credentials" : true
          }
        })
        .then(resp => resp.json())
        .then(result => setProfile(result))
  
      }
      getProfile();

    }, [])
    
    return (<div className='m-12 flex justify-between'>

        <div>
            <div className='bg-blue-400 w-fit rounded-full shadow-lg cursor-pointer'  style={{ backgroundImage: `url(${profile?.details?.img})`, backgroundSize: 'cover', padding: '140px' }}></div>

            <div className="text-4xl font-bold mt-8 text-slate-700">{profile?.details?.fullName}</div>
            <div className="text-xl font-light text-slate-700">@{profile?.details?.tag}</div>

            <div className='w-72 text-slate-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, dolores! Debitis autem quam incidunt ad "(Bio from mongo!)"</div>
        </div>

        <div className='flex-1 text-2xl font-bold text-slate-700'>

            {profile?.details?.fullName}'s Thoughts..

            <h1 className="text-blue-400 text-4xl font-bold p-12">
              Latest thoughts..
      
              {profile?.thoughts?.length !== 0 ? profile?.thoughts?.map((thought) => {

                  return (

                    <div className="p-8 bg-gray-100 rounded-2xl shadow-2xl m-8 transition-all 
                    hover:bg-blue-400 hover:transition-all hover:p-10
                    ">
                      <div className="text-2xl font-bold text-gray-600  transition:all hover:transition:all hover:text-white">
                        {thought.title}
                      </div>
                      <div className="text-gray-500 text-sm  transition:all hover:transition:all hover:text-white">
                        {thought.description}
                      </div>
                      <div className="text-gray-500 text-sm transition:all hover:transition:all hover:text-white font-light flex">
                        <div className='p-3 bg-blue-400 w-fit rounded-full shadow-lg cursor-pointer' style={{ backgroundImage: `url(${profile?.details?.img})`, backgroundSize: 'cover' }}></div>
                        
                        <Link className="text-blue-800 text-md transition:all hover:transition:all pl-1" to={'/profile/'+thought.by}>@{thought.by}
                        </Link>
                        
                        <div className="pl-1"> shared a thought on {thought.date.slice(0, 10)}</div>
                      </div>
                    </div>

                  )

              }) : <div className="p-12 text-slate-500">Loading, Please Wait!...</div>}

          </h1>

        </div>
    </div>);
}
 
export default Profile;