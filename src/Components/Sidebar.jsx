import Envelope from "../icons/Envelope";
import Chat from "../icons/ChatIcon";
import Bell from "../icons/Bell";
import Trash from "../icons/Trash";
import ProfileIcon from "../icons/Profile";

// Images
import LogoImage from "./../images/Logo.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    const signOutHandler = () => {
        navigate("/sign-in");
    };

    return (
        <div className="bg-black w-24 h-full rounded-3xl lg:flex flex-col items-center justify-between p-6 hidden">
            <div className="h-15 w-15">
                <img src={LogoImage} alt="Logo" className="w-full h-full" />
            </div>
            <ul className="space-y-7">
                <li>
                    <Envelope className="h-5 w-5 cursor-pointer" color="white" />
                </li>
                <li>
                    <Chat className="h-5 w-5 cursor-pointer" color="#FF3406" />
                </li>
                <li>
                    <Bell className="h-5 w-5 cursor-pointer" color="white" />
                </li>
                <li>
                    <Trash className="h-5 w-5 cursor-pointer" color="white" />
                </li>
            </ul>
            <button onClick={signOutHandler} className="h-9 w-9 rounded-full bg-neutral-800 flex items-center justify-center cursor-pointer">
                <ProfileIcon className="h-5 w-5" color="white" />
            </button>
        </div>
    );
};

export default Sidebar
