import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from 'react-icons/ai';
import Modal from './Modal'; // Import your Modal component
import useRegisterModal from '../../hooks/useRegisterModal';
import Heading from '../Heading';
import Input from '../inputs/Input'; // Assuming this is your custom Input component
import axios from 'axios';
import Button from '../Button';
import useLoginModal from '../../hooks/useLoginModal';

export default function RegisterModal() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        loginModal.open();
        registerModal.close();
    };

    const onSubmit = async (formData) => {
        setIsLoading(true);

        try {
            console.log(formData)
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, formData);
            console.log('Response:', response.data);
            const { user, token } = response.data;
             console.log(user, token)
             localStorage.setItem('jwt', token);
            setIsLoading(false);
            registerModal.close();
            toast.success('Registration successful');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('Email already exists');
            } else {
                toast.error('Error registering:', error.message);
            }
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        registerModal.close();
    };

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
            <Input 
                id="email" 
                label="Email" 
                type="email"
                name="email"
                disabled={isLoading} 
                register={register} 
                errors={errors} 
                required 
            />
            <Input 
                id="fullName"  // Corrected id attribute to match 'name' field
                label="Full Name"  // Corrected label to match 'fullName'
                type="text"
                name="fullName"  // Corrected name attribute to 'fullName'
                disabled={isLoading} 
                register={register} 
                errors={errors} 
                required 
            />
            <Input 
                id="password" 
                label="Password" 
                type="password"
                name="password"
                disabled={isLoading} 
                register={register} 
                errors={errors} 
                required 
            />
        </div>
    );

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => {}} />
            <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => {}} />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div onClick={handleLogin} className='text-blue-600 font-semibold cursor-pointer hover:underline'>
                        Log in
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            isOpen={registerModal.isOpen}
            onOpen={registerModal.open}
            onClose={handleClose}
            onSubmit={handleSubmit(onSubmit)}  // Using handleSubmit from react-hook-form
            title="Register"
            body={bodyContent}
            footer={footerContent}
            actionLabel={"Continue"}
            disabled={isLoading}
            secondaryAction={handleClose}
            secondaryActionLabel="Cancel"
        />
    );
}
