import { useState } from "react";

const Sidebar = ( { users } ) => {
    
    const [trending, setTrending] = useState(true);
    const [searchUser, setSearchUser] = useState(false);

    const thoughts = [
        'Election 2022',
        'Pak Vs Aus',
        'Imported Govt.',
    ]

    return (<>

        <div className="bg-gray-100 m-12 p-12 shadow-2xl w-fit rounded-2xl self-start fixed right-0">
            
            <div className='flex justify-around'> 
                <div className="text-sm font-bold text-slate-600 transition-all hover:transition-all hover:text-lg cursor-pointer" onClick={() => {

                    if(!trending){
                        setTrending(!trending)
                        setSearchUser(!searchUser)
                    }

                }}>
                    Trending!
                </div>
                <div className="text-sm font-bold text-slate-600 transition-all hover:transition-all hover:text-lg
                cursor-pointer" onClick={() => {

                    if(!searchUser){
                        setSearchUser(!searchUser)
                        setTrending(!trending)
                    }

                }}>
                    Search User!
                </div>
            </div>

            {trending && (<>
            
                <div className="rounded-2xl shadow-xl w-fit p-2 focus:outline-none">
                🔎<input type="text" className="bg-gray-100 p-2 rounded-2xl w-fit" />
                </div>
            
                <div className="font-bold pt-2">
                    Most Popular Thoughts
                </div>

                <div className="py-1 mt-4 rounded-2xl shadow-2xl bg-blue-400">
                {thoughts.map((thought) => {

                    return (<div className="bg-blue-500 m-4 p-4 rounded-2xl shadow-xl">

                        <div className="text-white text-xs font-bold">
                            {thought} - {Math.trunc(Math.random()* 500)}K
                        </div>

                    </div>)

                })}
              </div>
                
            </>)}

            {searchUser && (<>
            
                <div className="rounded-2xl shadow-xl w-fit p-2 focus:outline-none">
                🔎<input type="text" className="bg-gray-100 p-2 rounded-2xl w-fit" />
            </div>

            <div className="py-1 mt-4 rounded-2xl shadow-2xl bg-blue-400">
                {users.map((user) => {

                    return (<div className="bg-blue-500 m-4 p-4 rounded-2xl shadow-xl">

                        <div className="text-white text-xs font-bold">
                            {user.name?.givenName}
                        </div>

                        <div className="text-white text-xs">
                            {user.bio}
                        </div>

                    </div>)

                })}
              </div>

            </>)}

        </div>

    </>);
}
 
export default Sidebar;