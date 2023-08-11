import {useState,useEffect} from 'react'
import {Link, useNavigate } from 'react-router-dom';
import Loader from '../components/layout/loader';
import useForm from '../components/formControllers/useForm';
import fetchApi from "../components/fetchApi_data/fetchApi";
import userLogo from '../assets/user.png'
import mailLogo from '../assets/mail.png'
import hidePasswordLogo from '../assets/visibility.png'
import showPasswordLogo from '../assets/close-eye.png'
import { Text,Input,InputGroup,InputRightAddon, useToast ,Button} from '@chakra-ui/react'
import {SignupValidate} from "../components/formControllers/validate";
const SignUp = () => {
    const [isLoaded,setIsLoaded]=useState(false);
    const toast=useToast();
    const navigate=useNavigate();
    const {values,handleChange,handleSubmit,errors}=useForm(signup,SignupValidate)
    
    const [showPassword,setShowPassword]=useState(false);

    
    useEffect(()=>{
        setIsLoaded(true)
    },[])

    async function signup(){
        const requestBody={
            username:values.username,
            email:values.email,
            password:values.password
        }
        try{
            const res=await fetchApi('signup',requestBody);
            if(res.status===200){
                localStorage.setItem('email',values.email)
                toast({
                    title: 'User Successfully Signed Up!',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                navigate('/');
            }else{
                toast({
                    title: res.data.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
        }catch(err){
            console.log(err);
        }
        
        
    }
  return (
    <>
    {isLoaded?
        <div className='w-full h-screen flex flex-col justify-center items-center bg-blue-800'>
            <div className='w-1/3 bg-white flex flex-col space-y-5 pb-10 justify-center items-center shadow-2xl'>
                <h1 className='text-xl m-4 p-4'>Sign Up to Proceed</h1>
                <div className='w-3/4'>
                    <Text>Name</Text>
                    <InputGroup>
                        <Input
                            placeholder="Name" 
                           
                            name='username'
                            value={values.username || ''}
                            onChange={handleChange}
                            focusBorderColor={errors.username?`red.500`:`blue.500`}
                        />
                        <InputRightAddon>
                            <img src={userLogo} width={20} height={20}/>
                        </InputRightAddon>
                    </InputGroup>
                    {errors.username && <p style={{color:'red'}}>*{errors.username}</p>}
                </div>
                <div className='w-3/4'>
                    <Text>Email</Text>
                    <InputGroup>
                        <Input
                            placeholder="Email" 
                       
                            name='email'
                            value={values.email || ''}
                            onChange={handleChange}
                            focusBorderColor={errors.email?`red.500`:`blue.500`}
                        />
                        <InputRightAddon>
                            <img src={mailLogo} width={20} height={20}/>
                        </InputRightAddon>
                    </InputGroup>
                    {errors.email && <p style={{color:'red'}}>*{errors.email}</p>}
                </div>
                <div className='w-3/4'>
                    <Text>Password</Text>
                    <InputGroup>
                        <Input
                            placeholder="Password" 
            
                            name='password'
                            value={values.password || ''}
                            onChange={handleChange}
                            focusBorderColor={errors.password?`red.500`:`blue.500`}
                            type={showPassword?'text':'password'}
                        />
                        <InputRightAddon onClick={()=>setShowPassword(!showPassword)}>
                            <img src={showPassword?`${showPasswordLogo}`:`${hidePasswordLogo}`} width={20} height={20}/>
                        </InputRightAddon>
                    </InputGroup>
                    {errors.password && <p style={{color:'red'}}>*{errors.password}</p>}
                </div>
                <Button colorScheme='blue' className='w-1/3' variant='solid' onClick={handleSubmit}>
                    Sign Up
                </Button>
            <p>Already Have an Account? <Link to='/login' className='text-blue-700 underline'>Log In</Link>!</p>

            </div>
        </div>
    :<Loader/>}
    </>
  )
}

export default SignUp