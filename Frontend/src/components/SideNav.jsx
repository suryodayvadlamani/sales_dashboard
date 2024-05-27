import React, { useState } from 'react';
import DynamicIcon from './DynamicIcon';

const SideNav = () => {
    const menuItems = [
        { id: 1, name: 'Dashboard', icon: 'FaChartLine' },
        { id: 2, name: 'Order', icon: 'FaShoppingBasket' },
        { id: 3, name: 'Products', icon: 'FaCartArrowDown' },
    ];
    const [selected, setSelected] = useState(menuItems[0].id);

    return <div className="w-64  flex flex-col gap-2 p-4 bg-white">

        {menuItems.map(item => (
            <div
                key={item.id}
                onClick={() => setSelected(item.id)}
                className={`flex items-center p-4 cursor-pointer rounded-2xl ${selected === item.id ? 'bg-[#5d5fef] text-white' : ''
                    } hover:bg-blue-400`}
            >

                <DynamicIcon iconName={item.icon} className={`w-6 h-6 ${selected === item.id ? 'text-white' : ''}`} />
                <span className="ml-4">{item.name}</span>
            </div>
        ))}

    </div>
}
export default SideNav