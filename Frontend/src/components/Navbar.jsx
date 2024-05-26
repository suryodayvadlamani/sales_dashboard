import logo from "../logo.svg"
import { FaUser } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className="flex items-center fixed-top bg-white justify-between p-1">
            <div className="items-center text-center p-2 flex gap-2">
                <img src={logo} alt="logo" className="h-12" />
                Sales Dashboard</div>
            <ul className="flex items-center p-4">
                <li>
                <FaUser className="cursor-pointer"/>
                    
                </li>
            </ul>
        </nav>
    )
}

export default Navbar