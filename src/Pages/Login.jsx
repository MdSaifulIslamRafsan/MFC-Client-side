import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_BASEURL}/api/login`, data);
          const token = response.data.token;
          localStorage.setItem('token', token);
    
          const userResponse = await axios.get(`${import.meta.env.VITE_BASEURL}/api/current-user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          setUser(userResponse.data);
          navigate('/');
        } catch (error) {
          console.error('Login failed:', error.response?.data?.message || error.message);
          alert('Invalid credentials, please try again.');
        }
      };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        type="text"
                        name="identifier"
                        placeholder="Mobile or Email"
                        {...register("identifier", {
                            required: "Mobile or Email is required",
                            pattern: {
                                value: /^(\d{9,15}|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                                message: "Enter a valid email or mobile number"
                            }
                        })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                    />
                    {errors.identifier && <p className="text-red-600">{errors.identifier.message}</p>}
                    
                    <input
                        type="password"
                        name="pin"
                        placeholder="PIN"
                        {...register("pin", {
                            required: "PIN is required",
                            pattern: {
                                value: /^\d{5}$/,
                                message: "PIN must be exactly 5 digits"
                            }
                        })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                    />
                    {errors.pin && <p className="text-red-600">{errors.pin.message}</p>}
                    
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                    >
                        Login
                    </button>
                    <p>Don’t have an account? <Link className='text-blue-600' to={'/register'}>Register</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
