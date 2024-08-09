import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from 'react-icons/ai';
import Modal from './Modal';
import useRegisterModal from '../../hooks/useRegisterModal';
import useLoginModal from '../../hooks/useLoginModal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import axios from 'axios';
import Button from '../Button';
import { useUser } from '../../UserContext';

export default function LoginModal() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const { setUser } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (formData) => {
        setIsLoading(true);
        const { email, password } = formData;
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, { email, password });
            setIsLoading(false);
            toast.success('Logged in successfully');
            const { user, token } = response.data;
            localStorage.setItem('jwt', token);
            loginModal.close();
            setUser(response.data.user);
            console.log(user, token);
        } catch (error) {
            toast.error(`Error logging in: ${error.message}`);
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        loginModal.close();
    };

    const handleSignUp = () => {
        loginModal.close();
        registerModal.open();
    };

    return (
        <Modal
            isOpen={loginModal.isOpen}
            onOpen={loginModal.open}
            onClose={handleClose}
            onSubmit={handleSubmit(onSubmit)}
            title="Login"
            body={(
                <div className='flex flex-col gap-4'>
                    <Heading title="Welcome back" subtitle="Login to your account!" />
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
            )}
            footer={(
                <div className='flex flex-col gap-4 mt-3'>
                    <hr />
                    <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => {}} />
                    <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => {}} />
                    <div className='text-neutral-500 text-center mt-4 font-light'>
                        <div className='justify-center flex flex-row items-center gap-2'>
                            <div>
                                First time using Airbnb?
                            </div>
                            <div onClick={handleSignUp} className='text-blue-600 font-semibold cursor-pointer hover:underline'>
                                Register
                            </div>
                        </div>
                    </div>
                </div>
            )}
            actionLabel="Continue"
            disabled={isLoading}
            secondaryAction={handleClose}
            secondaryActionLabel="Cancel"
        />
    );
}
