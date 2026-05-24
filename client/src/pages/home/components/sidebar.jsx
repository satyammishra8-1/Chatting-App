import Search from "./search";
import { useState } from "react";
import UserList from "./userList";
import { deleteChatForMe } from "../../../apiCalls/chat";

function Sidebar({socket, onlineUsers}) {
    const [searchKey, setSearchKey] = useState("");
    const [openChatMenuId, setOpenChatMenuId] = useState(null);

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