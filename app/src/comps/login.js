import env from "../env";

const Login = () => {

    return (<div>

        <div className="p-8">
            <div className="text-blue-400 font-bold text-center text-8xl drop-shadow-xl">Thoughts💭</div>
            <div className="text-slate-500 text-center p-8 text-xl drop-shadow-xl">Have one?, Post it?</div>
        </div>

        <div className="text-center text-2xl text-slate-500 font-bold drop-shadow-xl">
            Login.. 
        </div>

        <div className="cursor-pointer my-8 flex items-center rounded-2xl shadow-xl border-blue-400 text-blue-400 border-2 text-center w-fit mx-auto p-4 hover:transition-all transition-all hover:shadow-2xl"
            onClick={() => {
                window.location.href = 'http://localhost:8080/auth/google'
            }}
        >
            <img width='40px' height='auto' src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png' alt='google'/>
            <div>
                Sign In With Google!
            </div>
        </div>
        
    </div>);
}
 
export default Login;