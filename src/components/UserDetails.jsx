import React, { useEffect, useRef, useState } from 'react';
import { useUserContext } from '../context/AuthProvider';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import profile from "../../assets/profile3.jpg";
import { MdModeEdit, MdCheck } from "react-icons/md";
import { auth } from '../services/firebase/firebase';
import { updateProfile } from 'firebase/auth';
import { useTypingContext } from '../context/TextProvider';
import { AiOutlineLoading } from "react-icons/ai";
import { FaCameraRetro } from "react-icons/fa";
import { updateLeaderboardPhotoUrl } from '../services/firebase/LeaderboardData';
import toast from 'react-hot-toast';

const UserDetails = ({mobileInputVisible}) => {
    const { User, updateUser, setUser } = useUserContext();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(User.displayName);
    const [image, setImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false); 
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);
    const { keyEnable } = useTypingContext();

    useEffect(() => {
        if (isEditing) {
            keyEnable.current = false;
            inputRef.current.focus();
        }
    }, [isEditing, keyEnable]);

    const updatePhotoUrlInLeaderboard = async (photoUrl) => {
        
        await updateLeaderboardPhotoUrl(User.uid, photoUrl);
       
      };

    const handleEditClick = () => {
        if (isEditing) {
            if (newName.trim() !== "") {
                updateUser(newName);
            } else {
                setNewName(User.displayName);
            }
        } else {
            setNewName('');
        }
        setIsEditing(!isEditing);
        if (!isEditing) {
            keyEnable.current = false;
        } else {
            keyEnable.current = true;
        }
    };

    const handleChange = (e) => {
        setNewName(e.target.value);
    };

    const handleImageChange = async (e) => {
        if (e.target.files[0]) {
            const selectedImage = e.target.files[0];
            setImage(selectedImage);
            setIsUploading(true); // Set uploading status to true
            await uploadUserImage(selectedImage);
            setIsUploading(false); // Set uploading status to false
        }
    };

    const uploadUserImage = async (image) => {
        const storage = getStorage();
        const userId = auth.currentUser.uid;
        const storageRef = ref(storage, `user-images/${userId}/${image.name}`);
    
        const userImagesRef = ref(storage, `user-images/${userId}`);
        const userImagesList = await listAll(userImagesRef);
    
        // Delete each file reference
        const deletePromises = userImagesList.items.map(async (itemRef) => {
            await deleteObject(itemRef);
        });
    
        try {
            await Promise.all(deletePromises); 
    
            const snapshot = await uploadBytes(storageRef, image);
            const downloadURL = await getDownloadURL(snapshot.ref);
            await updateProfile(auth.currentUser, {
                photoURL: downloadURL
            });
           
            setUser({ ...User, photoURL: downloadURL });
             await updatePhotoUrlInLeaderboard(User.photoURL)
        } catch (error) {
            
            toast.error(error.message)
        }
    };
    
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className={`flex flex-col justify-center items-center mt-5 mb-5 gap-5  ${mobileInputVisible?"hidden":""}`}>
            <div className='relative '>
                {User.photoURL ? (
                    <figure>
                        <img src={User.photoURL} alt="profile image" className="rounded-full w-32 h-32" />
                    </figure>
                ) : (
                    <figure>
                        <img src={profile} alt="profile image" className="rounded-full w-32 h-32" />
                    </figure>
                )}
                <i className='absolute bottom-2 right-2 bg-gray-300 rounded-full text-black p-1 cursor-pointer hover:bg-gray-500' onClick={triggerFileInput} title='upload image'>
                    <FaCameraRetro />
                </i>
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                />
                {isUploading && (
                    <div className='absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 rounded-full'>
                        <AiOutlineLoading className="text-white animate-spin" size={24} />
                    </div>
                )}
            </div>
            <div className='flex gap-2 items-center'>
                <input
                    ref={inputRef}
                    type="text"
                    value={newName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`border ${isEditing ? 'border-blue-500' : 'border-transparent'} rounded outline-none focus:outline-blue-500`}
                />
                

                {isEditing ? <i className='hover:text-gray-500 cursor-pointer' title='okay' onClick={handleEditClick}>
                    <MdCheck />
                </i> : <i className='hover:text-gray-500 cursor-pointer' title='edit' onClick={handleEditClick}>
                    <MdModeEdit />
                </i>}
            </div>
        </div>
    );
};

export default UserDetails;
