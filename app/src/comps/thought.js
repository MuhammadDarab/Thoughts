import { useEffect } from "react";
import env from "../env";
import { useState } from "react";

const Thought = ( { using } ) => {

    const [update, setUpdate] = useState(0)

    function postComment() {

        let comment = document?.querySelector('#comment').value;

        fetch('https://thoughtsbackend.vercel.app' + '/comment', { 
            method : 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                id: localStorage.getItem('thought'),
                comment: comment,
                by: using.name.givenName,
                img: using.photos[0].value
        })})


    }

    const [thought, setThought] = useState();
    const [comments, setComments] = useState([]);

    useEffect(() => {

        let thoughtId = localStorage.getItem('thought') 
        fetch('https://thoughtsbackend.vercel.app' + '/thought/' + thoughtId )
        .then((res) => res.json())
        .then((result) => {

            setThought(result[0])

        })

    }, [])

    useEffect(() => {

        console.log('just ran again, No of rerenders => ' + update)
        setTimeout(() => {
            let thoughtId = localStorage.getItem('thought')
            fetch('https://thoughtsbackend.vercel.app' + '/comments/' + thoughtId)
            .then(response => response.json())
            .then(cmnt => setComments(cmnt.reverse()))
        }, 1000)

    }, [update])
    
    return (<div className="flex">

    <div>
        
        <h1 className="text-blue-400 text-4xl font-bold p-12">
            Thought..
        </h1>

        <div className="pl-12">
            <i className="text-slate-500">@{thought?.by} says...</i>
        <br />
            <input id="title" type="text" disabled value={thought?.title}  placeholder="Title.." className="p-2 my-4 text-6xl rounded-xl shadow-xl"/>
        <br />
            <textarea id="description" cols="72" disabled rows="10" value={thought?.description} placeholder="thought.." className="p-2 text-xl rounded-xl shadow-xl"></textarea>
        
            <div className="flex items-center">
                
                <input id="comment" type="text" placeholder="Add A Comment.." className="p-2 my-4 text-4xl rounded-xl shadow-xl flex-1"/>

                <div className="bg-blue-400 ml-4 p-4 text-white rounded-2xl shadow-2xl cursor-pointer"
                    onClick={(e) => {
                        postComment();
                        setUpdate(update+1)
                    }}
                >Comment</div>

            </div>
        
        
        </div>

    </div>

    <div className="">
        
        <h1 className="text-blue-400 text-4xl font-bold p-12">
            Details..
        </h1>

        <div className="pl-12">
            <i className="text-slate-500 text-4xl">💖{Math.trunc(Math.random()*77 + 20)}k</i>
            <i className="text-slate-500 text-2xl">👍{Math.trunc(Math.random()*32 + 5)}k</i>
            <i className="text-slate-500 text-md">💡{Math.trunc(Math.random()*4 + 1)}k</i>
            <div className="p-2 my-4 text-xl rounded-xl shadow-xl">
                Comments..
                <div className="p-2 my-4 text-xl rounded-xl shadow-xl h-80 w-96 overflow-y-scroll">
                    { comments.length !== 0 ? comments?.map((comment) => {

                        return (
                        
                            <div className="flex items-center">

                                <div className="shadow-xl rounded-xl m-1 p-2 flex-1">

                                    <div className="text-md text-slate-500">{comment.comment}</div>
                                    <div className="text-md text-sm text-slate-400">@{comment.by}</div>

                                </div>

                                <div className='p-6 m-2 bg-blue-400 w-fit rounded-full shadow-lg cursor-pointer' style={{ backgroundImage: `url(${comment.img})`, backgroundSize: 'cover' }}>

                                    <div className="bg-lime-600 p-2 rounded-full shadow-lg relative -bottom-5 -left-5">
                                    </div>

                                </div>

                            </div>

                        )

                    }) : <div className="text-slate-300 text-center">No Comments To Display</div>}
                </div>
            </div>
        </div>



    </div>


    </div>);
}
 
export default Thought;