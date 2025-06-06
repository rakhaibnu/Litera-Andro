import { Star, KeyRound, UserRound, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { FormField } from '../components/FormField';

export default function Security() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isCurrentVisible, setIsCurrentVisible] = useState(false);
  const [isNewVisible, setIsNewVisible] = useState(false);
  const [isCurrentEyeHovered, setIsCurrentEyeHovered] = useState(false);
  const [isNewEyeHovered, setIsNewEyeHovered] = useState(false);

  return (
    <section className="w-full min-h-screen bg-white">
      <div className="flex flex-row justify-center items-start mt-10 min-h-[80vh]">
        {/* Sidebar */}
        <div className="flex flex-col border border-[#C6A986] m-10 p-8 mt-10 w-[370px] rounded-[20px] min-h-[650px] justify-between items-center">
          <div>
            <ul className="space-y-6 w-full">
              <li className="mb-2">
                <Link to="/profile">
                  <Button
                    text={
                      <span className="flex items-center gap-2 text-lg">
                        <UserRound /> Profile
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
                      <span className="flex items-center gap-2 text-lg just">
                        <KeyRound /> Security
                      </span>
                    }
                    className="w-full border border-[#C6A986] rounded-[8px] py-2 px-4 bg-[#f7ede2] text-black font-normal justify-start text-left"
                  />
                </Link>
              </li>
            </ul>
          </div>
          <Button
            text={
              <span className="flex items-center gap-2 text-lg justify-center">
                <LogOut /> Logout
              </span>
            }
            className="w-1/2 mt-10 bg-[#D97D74] hover:bg-[#b85e56] text-white border-none rounded-[8px] py-2 px-4 justify-center"
          />
        </div>
        {/* Main Content */}
        <div className="flex flex-col border border-[#C6A986] m-10 p-10 mt-10 w-[730px] rounded-[20px] min-h-[650px] bg-white">
          <div className="flex flex-col items-center mb-8">
            <h3 className="font-merriweather text-5xl font-bold mb-4">
              Security
            </h3>
          </div>
          <form className="w-full max-w-2xl mx-auto flex flex-col gap-4">
            <FormField
              id="current-password"
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter Your Current Password"
              isPasswordVisible={isCurrentVisible}
              togglePasswordVisibility={() => setIsCurrentVisible((v) => !v)}
              isEyeHovered={isCurrentEyeHovered}
              handleEyeMouseEnter={() => setIsCurrentEyeHovered(true)}
              handleEyeMouseLeave={() => setIsCurrentEyeHovered(false)}
            />
            <FormField
              id="new-password"
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter A New Password"
              isPasswordVisible={isNewVisible}
              togglePasswordVisibility={() => setIsNewVisible((v) => !v)}
              isEyeHovered={isNewEyeHovered}
              handleEyeMouseEnter={() => setIsNewEyeHovered(true)}
              handleEyeMouseLeave={() => setIsNewEyeHovered(false)}
            />
            <Button
              text="Update Password"
              className="w-fit border border-black bg-white text-black rounded-[8px] px-6 py-2 mt-2"
            />
          </form>
        </div>
      </div>
    </section>
  );
}
