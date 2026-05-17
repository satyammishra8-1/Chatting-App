import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header(){
    const { user } = useSelector(state => state.usersReducer);
    const navigate = useNavigate();

    function getFullName() {
    if(!user) return "";
    let fname = user.firstname.at(0).toUpperCase() + user.firstname.slice(1).toLowerCase();
    let lname = user.lastname.at(0).toUpperCase() + user.lastname.slice(1).toLowerCase();
    return fname + " " + lname;
}

function getInitials(){
    if(!user) return "";
    let f = user.firstname.toUpperCase()[0];
    let l = user.lastname.toUpperCase()[0];
    return f + l;
}

    return(
        <div className="app-header">
            <div className="app-logo">
                <i className="fa fa-comments"></i>
                Quick Chat
            </div>

            <div className="app-user-profile">
                <div className="logged-user-name">{getFullName()}</div>
                {user?.profilePic && <img src={user?.profilePic} alt="profile-pic" className='logged-user-profile-pic' />}
                {!user?.profilePic && <div className="logged-user-profile-pic" onClick={() => navigate('/profile')}>
                    {getInitials()}
                </div>}
            </div>
        </div>
    );
}

export default Header;