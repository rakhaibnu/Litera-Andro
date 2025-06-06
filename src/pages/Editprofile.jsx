import { KeyRound, UserRound, LogOut, CircleUser } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { FormField } from '../components/FormField';
import NoProfile from '../assets/noProfile.png';
import CatProfile from '../assets/catProfile.png';
import PandaProfile from '../assets/pandaProfile.png';
import OwlProfile from '../assets/owlProfile.png';
import SharkProfile from '../assets/sharkProfile.png';
import axios from 'axios';

export default function EditProfile() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    image: null
  });
  const [selectedProfile, setSelectedProfile] = useState(() => {
    return localStorage.getItem('userProfile') || null;
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
            username: response.data.data.username,
            email: response.data.data.email,
            image: response.data.data.image || localStorage.getItem('userProfile')
          });
          setSelectedProfile(response.data.data.image || localStorage.getItem('userProfile'));
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

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      const formData = new FormData();
      formData.append('username', userData.username);
      formData.append('email', userData.email);

      if (selectedProfile) {
        const response = await fetch(selectedProfile);
        const blob = await response.blob();
        formData.append('image', blob, 'profile.png');
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify({
          ...user,
          username: userData.username,
          email: userData.email,
          image: selectedProfile
        }));
        localStorage.setItem('userProfile', selectedProfile);
        navigate('/profile');
      }
    } catch (error) {
      console.error('Update profile error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.clear();
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.clear();
      navigate('/signin');
    }
  };

  const profileImages = [
    { src: NoProfile, alt: 'No Login' },
    { src: CatProfile, alt: 'Cat Profile' },
    { src: PandaProfile, alt: 'Panda Profile' },
    { src: OwlProfile, alt: 'Owl Profile' },
    { src: SharkProfile, alt: 'Shark Profile' },
  ];

  

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
                Logout
              </span>
            }
            className="w-full mt-10 bg-[#D97D74] hover:bg-[#b85e56] text-white border-none rounded-[8px] py-2 px-4 justify-center"
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col border border-[#C6A986] m-10 p-10 mt-10 w-[730px] rounded-[20px] min-h-[747px] bg-white">
          <div className="flex flex-col items-center mb-8">
            <h3 className="font-merriweather text-5xl font-bold mb-4">
              Profile
            </h3>
            {selectedProfile ? (
              <img
                src={selectedProfile}
                alt="Selected Profile"
                className="w-32 h-32 rounded-full mx-auto"
              />
            ) : (
              <CircleUser size={120} className="mx-auto" />
            )}
          </div>
          <div className="flex flex-col">
            <p className="mb-4">Photo Profile</p>
            <div className="flex mb-4">
              {profileImages.map((profile, index) => (
                <img
                  key={index}
                  src={profile.src}
                  alt={profile.alt}
                  className={`w-16 h-16 rounded-full mx-2 cursor-pointer hover:ring-2 hover:ring-[#C6A986] transition ${
                    selectedProfile === profile.src ? 'ring-2 ring-[#C6A986]' : ''
                  }`}
                  onClick={() => setSelectedProfile(profile.src)}
                />
              ))}
            </div>
          </div>
          <form className="w-full max-w-2xl mx-auto flex flex-col gap-4">
          <FormField
            id="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={userData.username}
            onChange={(e) => setUserData(prev => ({...prev, username: e.target.value}))}
          />
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={userData.email}
            onChange={(e) => setUserData(prev => ({...prev, email: e.target.value}))}
          />
          <Button
            text="Save Changes"
            onClick={handleSaveChanges}
            className="w-fit border border-black bg-white text-black rounded-[8px] px-6 py-2 mt-2 hover:bg-latte-cream-7 transition"
          />
        </form>
        </div>
      </div>
    </section>
  );
}