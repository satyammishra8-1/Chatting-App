import { useSelector } from 'react-redux';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../redux/loaderSlice';
import { setUser } from '../../redux/usersSlice';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp } from "../../apiCalls/otp";
import {
  uploadProfilePic,
  updatePreferredLanguage,
  changeSecurePin
} from '../../apiCalls/users';

function Profile(){
    const { user } = useSelector(state => state.usersReducer);
    const [image, setImage] = useState(null);
    const [preferredLanguage, setPreferredLanguage] = useState(user?.preferredLanguage || "en");
    const [showPinModal, setShowPinModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [newPin, setNewPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");

    useEffect(() => {
        if(user?.profilePic){
            setImage(user.profilePic);
        }
    }, [user?.profilePic]);

    useEffect(() => {
    if(user?.preferredLanguage){
        setPreferredLanguage(user.preferredLanguage);
    }
}, [user]);

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

const onLanguageChange = async (e) => {

    const value = e.target.value;

    setPreferredLanguage(value);

    const response = await updatePreferredLanguage(value);

    if(response.success){

        dispatch(setUser(response.data));

        localStorage.setItem(
            "user",
            JSON.stringify(response.data)
        );

        toast.success(response.message);
    }
};


   return (
    <div className="profile-page-container">
        <i
            className="fa fa-arrow-left profile-back-btn"
            onClick={() => navigate("/")}
            ></i>
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
                <select
                    value={preferredLanguage}
                    onChange={onLanguageChange}
                    >
                    <option value="en">English</option>
                    <option value="hi">हिन्दी</option>
                    <option value="kn">ಕನ್ನಡ</option>
                    <option value="ta">தமிழ்</option>
                    </select>

                    <button
                    className="upload-image-btn"
                    onClick={() => setShowPinModal(true)}
                    >
                    🔐 Change Secure PIN
                    </button>
            </div>
        </div>
                    {showPinModal && (
            <div className="schedule-modal-overlay">
                <div className="schedule-modal">

                <h3>Change Secure PIN</h3>

                <button
                    onClick={async () => {

                        const response = await sendOtp(user.email);

                        if(response.success){
                        toast.success("OTP Sent");
                        }else{
                        toast.error(response.message);
                        }

                    }}
                    >
                    Send OTP
                    </button>

                    <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    />
                    <button
                    onClick={async () => {
                        const response = await verifyOtp(
                        user.email,
                        otp
                        );
                        if(response.success){
                        setOtpVerified(true);
                        toast.success("OTP Verified");
                        }else{
                        toast.error(response.message);
                        }
                    }}
                    >
                    Verify OTP
                    </button>

                    {otpVerified && (
                    <>
                        <input
                        type="password"
                        maxLength={4}
                        placeholder="New PIN"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        />

                        <input
                        type="password"
                        maxLength={4}
                        placeholder="Confirm PIN"
                        value={confirmPin}
                        onChange={(e) => setConfirmPin(e.target.value)}
                        />

                        <button
                        onClick={async () => {

                            if(newPin !== confirmPin){

                            toast.error("PINs do not match");
                            return;

                            }

                            if(!/^\d{4}$/.test(newPin)){
                            toast.error("PIN must be exactly 4 digits");
                            return;
                            }
                            const response = await changeSecurePin(newPin);

                            if(response.success){

                            toast.success("PIN Updated Successfully");

                            setShowPinModal(false);

                            setOtp("");
                            setOtpVerified(false);
                            setNewPin("");
                            setConfirmPin("");

                            }else{

                            toast.error(response.message);

                            }

                        }}
                        >
                        Save PIN
                        </button>
                    </>
                    )}

                <button
                    onClick={() => setShowPinModal(false)}
                >
                    Cancel
                </button>

                </div>
            </div>
            )}
    </div>
   )

}
export default Profile;