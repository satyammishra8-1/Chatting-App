import Search from "./search";
import { useState } from "react";
import UserList from "./userList";




function Sidebar({socket, onlineUsers}) {
    const [searchKey, setSearchKey] = useState("");

    return(
        <div className="app-sidebar">
            <Search 
                searchKey={searchKey}
                setSearchKey={setSearchKey}
            />

            <UserList 
                searchKey={searchKey} 
                socket={socket}
                onlineUsers = {onlineUsers}
            >
            </UserList>
        </div>
    )
}
export default Sidebar;