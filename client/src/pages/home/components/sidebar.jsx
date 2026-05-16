import Search from "./search";
import { useState } from "react";
import UserList from "./userList";




function Sidebar({socket}) {
    const [searchKey, setSearchKey] = useState("");

    return(
        <div className="app-sidebar">
            <Search 
                searchKey={searchKey}
                setSearchKey={setSearchKey}
            />

            <UserList searchKey={searchKey} socket={socket}></UserList>
        </div>
    )
}
export default Sidebar;