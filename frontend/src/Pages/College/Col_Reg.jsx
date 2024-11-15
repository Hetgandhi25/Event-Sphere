import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Col_Reg = () => {
  const [formData, setFormData] = useState({
    collegeName: '',
    email: '',
    password: '',
    confirmPassword: '',
    emailDomain: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }
  
    const dataToSubmit = {
      name: formData.collegeName,
      email: formData.email,
      password: formData.password,
      confirmPassword:formData.confirmPassword,
      emailDomain: formData.emailDomain,
    };
  
    try {
      const response = await fetch("http://localhost:3000/api/auth/college-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      const responseData = await response.json();
  
      if (!response.ok) {
        setError(responseData.message || 'Something went wrong');
        toast.error(responseData.message || 'Something went wrong');
      } else {
        
        toast.success(responseData.message || 'Verification OTP email sent');
        setError('');
  
        setFormData({
          collegeName: '',
          email: '',
          password: '',
          confirmPassword: '',
          emailDomain: '',
        });
  
        console.log(responseData);
        const userId = responseData.data.userId;
          setTimeout(() => {
            navigate(`/college-otp/${userId}`);
          }, 2000);
      }
    } catch (error) {
      console.log('Network error:', error);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-900 py-8">
      <ToastContainer/>
      <div className="w-[500px]  bg-gray-800 text-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-center mb-4">Join us</h2>
          <h3 className="text-lg text-center mb-2">Boost your events and make an impact!</h3>
        </div>

        <div className="overflow-y-auto max-h-[50vh] p-4 border rounded-lg bg-gray-800">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className="text-sm font-semibold text-gray-400">College Name *</label>
              <input
                className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                type="text"
                name="collegeName"
                placeholder="Enter Your College Name"
                value={formData.collegeName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-400">College Email *</label>
              <input
                className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                type="email"
                name="email"
                placeholder="Enter Your College Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-400">Password *</label>
              <input
                className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                type="password"
                name="password"
                placeholder="Create a Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-400">Confirm Password *</label>
              <input
                className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Your Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            {error && <p className="text-red-500 mb-4 flex justify-center">{error}</p>}
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-400">Email Domain *</label>
              <input
                className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                type="text"
                name="emailDomain"
                placeholder="Enter Your College Email Domain"
                value={formData.emailDomain}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-500 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

        <div className="text-center mt-4">
          <h3>
            Already have an account? <a className="text-blue-500 hover:underline" href="/college-login">Log In</a>
          </h3>
        </div>
      </div>
    </div>
  );
};