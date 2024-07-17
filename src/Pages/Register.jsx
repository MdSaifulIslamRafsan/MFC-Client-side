import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const navigate = useNavigate();
    
    const onSubmit = async(data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASEURL}/api/register`, data);

            alert(response.data.message);
            reset()
            navigate('/login')
        } catch (error) {
            console.error("There was an error registering!", error);
            if(error.response?.status === 409){
                return alert('User already exists')
            }
           alert(error.message);
           console.error("There was an error registering!", error);
        }
    }; 

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        {...register("name", { required: "Name is required" })} 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                    />
                    {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                    
                    <input
                        type="password"
                        name="pin"
                        placeholder="5-digit PIN"
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
                    
                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile Number"
                        {...register("mobile", { 
                            required: "Mobile number is required", 
                            pattern: {
                                value: /^\d{9,15}$/
                                ,
                                message: "Mobile number must be between 9 and 15 digits"
                            }
                        })} 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                    />
                    {errors.mobile && <p className="text-red-600">{errors.mobile.message}</p>}
                    
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        {...register("email", { 
                            required: "Email is required", 
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Enter a valid email address"
                            }
                        })} 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                    />
                    {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                    
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                    >
                        Register
                    </button>
                </form>
                <p>Already have an account? <Link className='text-blue-600' to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
