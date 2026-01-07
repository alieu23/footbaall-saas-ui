
import LoginForm from "../components/LoginForm";  

export default function Login() {


  return (
    <div className="min-h-screen flex">
            {/* Left Panel - Form */}
             <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
             <LoginForm />
             </div>


        
        {/* Right Panel - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 items-center justify-center p-12">
        <div className="max-w-lg text-white space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Start your journey with us
          </h1>
          <p className="text-xl text-blue-100">
            Discover the world's best community of freelancers and business owners.
          </p>
          <div className="flex items-center space-x-4 pt-8">
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white"></div>
              <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white"></div>
              <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white"></div>
            </div>
            <div>
              <p className="font-semibold">Join 10,000+ users</p>
              <div className="flex items-center mt-1">
                <span className="text-yellow-300">★★★★★</span>
                <span className="ml-2 text-sm">4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>

  );
}
