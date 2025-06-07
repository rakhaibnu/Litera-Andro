import { KeyRound, UserRound, LogOut, CircleUser } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { FormField } from '../components/FormField';
import axios from 'axios';

export default function Profile() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    image: null,
    reviewCount: 0,
    favoriteCount: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (!token || !user) {
          navigate('/signin');
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setUserData({
            ...response.data.data,
            image:
              response.data.data.image || localStorage.getItem('userProfile'),
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate('/signin');
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // Cek API URL
      const apiUrl =
        import.meta.env.VITE_API_URL || 'https://backend-litera.vercel.app';
      console.log('Logout URL:', `${apiUrl}/auth/logout`);

      const token = localStorage.getItem('token');
      if (!token) {
        // Token tidak ada, langsung hapus data dan arahkan ke signin
        console.log('No token found, redirecting to signin');
        localStorage.clear();
        navigate('/signin');
        return;
      }

      try {
        // Panggil API logout
        await axios.post(
          `${apiUrl}/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Logout API call successful');
      } catch (apiError) {
        // Tangani error API, tapi tetap lanjutkan proses logout
        console.error('API logout error:', apiError);
        // Tetap logout meskipun API gagal
      }

      // Hapus semua data dari localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userProfile');
      localStorage.removeItem('favorites');
      localStorage.removeItem('reviewedBooks');

      console.log('Local storage cleared, redirecting to signin');

      // Arahkan ke halaman signin
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
      // Jika terjadi error, tetap coba hapus data dan arahkan ke signin
      localStorage.clear();
      navigate('/signin');
    }
  };

  return (
    <section className="w-full min-h-screen bg-white">
      <div className="flex flex-row justify-center items-start mt-10 min-h-[80vh]">
        {/* Sidebar */}
        <div className="flex flex-col border border-[#C6A986] m-10 p-8 mt-10 w-[370px] rounded-[20px] min-h-[747px] justify-between items-center">
          <div>
            <ul className="space-y-6 w-full">
              <li className="mb-2">
                <Button
                  text={
                    <span className="flex items-center gap-2 text-lg">
                      <UserRound /> Profile
                    </span>
                  }
                  className="w-full border border-[#C6A986] rounded-[8px] py-2 px-4 bg-[#f7ede2] text-black font-normal justify-start text-left"
                />
              </li>
              <li className="mb-2">
                <Link to="/security">
                  <Button
                    text={
                      <span className="flex items-center gap-2 text-lg">
                        <KeyRound /> Security
                      </span>
                    }
                    className="w-full border border-[#C6A986] rounded-[8px] py-2 px-4 bg-white text-black font-normal justify-start text-left hover:bg-[#f7ede2] transition"
                  />
                </Link>
              </li>
            </ul>
          </div>
          <Button
            onClick={handleLogout}
            text={
              <span className="flex items-center gap-2 text-lg">
                <LogOut /> Logout
              </span>
            }
            className="w-full mt-10 bg-[#D97D74] hover:bg-[#b85e56] text-white border-none rounded-[8px] py-2 px-4 justify-center"
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col border border-[#C6A986] m-10 p-10 mt-10 w-[730px] rounded-[20px] min-h-[650px] bg-white">
          <div className="flex flex-col items-center mb-8">
            <h3 className="font-merriweather text-5xl font-bold mb-4">
              Profile
            </h3>
            {userData.image ? (
              <img
                src={userData.image}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto object-cover"
              />
            ) : (
              <CircleUser size={120} className="mx-auto text-gray-400" />
            )}
          </div>
          <form className="w-full max-w-2xl mx-auto flex flex-col gap-4">
            <FormField
              id="username"
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={userData.username}
              disabled
            />
            <FormField
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={userData.email}
              disabled
            />
            <Link to="/editprofile">
              <Button
                text="Edit Profile"
                className="w-fit border border-black bg-white text-black rounded-[8px] px-6 py-2 mt-2 hover:bg-latte-cream-6 transition"
              />
            </Link>
          </form>
          <hr className="my-8 border-gray-400" />
          <div className="flex gap-8 justify-center mt-4">
            <div className="flex flex-col items-center border border-gray-400 rounded-[12px] px-10 py-6 bg-white w-[220px]">
              <span className="text-3xl font-bold">{userData.reviewCount}</span>
              <span className="text-lg text-gray-700 mt-1">Reviewed Book</span>
            </div>
            <div className="flex flex-col items-center border border-gray-400 rounded-[12px] px-10 py-6 bg-white w-[220px]">
              <span className="text-3xl font-bold">
                {userData.favoriteCount}
              </span>
              <span className="text-lg text-gray-700 mt-1">Favourite Book</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
