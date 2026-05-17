import { useSelector } from 'react-redux';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadProfilePic } from '../../apiCalls/users';
import { hideLoader, showLoader } from '../../redux/loaderSlice';
import { setUser } from '../../redux/usersSlice';
import { toast } from 'react-hot-toast';

function Profile(){
    const { user } = useSelector(state => state.usersReducer);
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if(user?.profilePic){
            setImage(user.profilePic);
        }
    }, [user?.profilePic]);

    function getInitials(){
        if(!user) return "";
        let f = user.firstname.toUpperCase()[0];
        let l = user.lastname.toUpperCase()[0];
        return f + l;
    }
    //Imge setting function when user selects a new profile picture
    const onFileSelected = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader(file);

        reader.readAsDataURL(file);

        reader.onload = () => {
            setImage(reader.result);
        }

    }

    const updateProfilePic = async () => {
        try {
            dispatch(showLoader());
            const response = await uploadProfilePic(image);
            dispatch(hideLoader());

            if(response.success){
                toast.success(response.message);
                dispatch(setUser(response.data));
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data)
                );
            } else {
                toast.error(response.message);
            }

        } catch (error) {
            dispatch(hideLoader());
            toast.error(error.message);
        }
}


   return (
    <div className="profile-page-container">
        <div className="profile-pic-container">
           { image && <img src={image} 
                 alt="Profile Pic" 
                 className="user-profile-pic-upload" 
            /> }
           { !image && <div className="user-default-profile-avatar">
                { getInitials() }
            </div>}
        </div>

        <div className="profile-info-container">
            <div className="user-profile-name">
                <h1>{user?.firstname} {user?.lastname}</h1>
            </div>
            <div>
                <b>Email: </b>{user?.email}
            </div>
            <div>
                <b>Account Created: </b>{moment(user?.accountCreated).format('MMM DD, YYYY')   }
            </div>
            <div className="select-profile-pic-container">
                <input type="file" onChange={onFileSelected} />
                <button className='upload-image-btn' onClick={updateProfilePic}>Update Profile Picture</button>
            </div>
        </div>
    </div>
   )

}
export default Profile;