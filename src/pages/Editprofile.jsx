import { Star, KeyRound, UserRound, LogOut, CircleUser } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { FormField } from '../components/FormField';
import NoProfile from '../assets/noProfile.png';
import CatProfile from '../assets/catProfile.png';
import PandaProfile from '../assets/pandaProfile.png';
import OwlProfile from '../assets/owlProfile.png';
import SharkProfile from '../assets/sharkProfile.png';

export default function EditProfile() {
  const [name, setName] = useState('Salman Ibnu');
  const [email, setEmail] = useState('salak@gmail.com');
  const [selectedProfile, setSelectedProfile] = useState(() => {
    return localStorage.getItem('userProfile') || null;
  });
  const navigate = useNavigate();

  const profileImages = [
    { src: NoProfile, alt: 'No Login' },
    { src: CatProfile, alt: 'Cat Profile' },
    { src: PandaProfile, alt: 'Panda Profile' },
    { src: OwlProfile, alt: 'Owl Profile' },
    { src: SharkProfile, alt: 'Shark Profile' },
  ];

  const handleSaveChanges = () => {
    if (selectedProfile) {
      localStorage.setItem('userProfile', selectedProfile);
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
    }
    navigate('/profile');
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
                <Link to="/favorites">
                  <Button
                    text={
                      <span className="flex items-center gap-2 text-lg">
                        <Star /> Favourite
                      </span>
                    }
                    className="w-full border border-[#C6A986] rounded-[8px] py-2 px-4 bg-white text-black font-normal justify-start text-left hover:bg-[#f7ede2] transition"
                  />
                </Link>
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
            text={
              <span className="flex items-center gap-2 text-lg">
                <LogOut /> Logout
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
              id="name"
              label="Name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormField
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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