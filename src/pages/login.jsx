import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../components/layout/loader';
import useForm from '../components/formControllers/useForm';
import fetchApi from "../components/fetchApi_data/fetchApi";
import mailLogo from '../assets/mail.png'
import hidePasswordLogo from '../assets/visibility.png'
import showPasswordLogo from '../assets/close-eye.png'
import { Input,InputGroup,InputRightAddon, useToast ,Button} from '@chakra-ui/react'
import { LoginValidate} from "../components/formControllers/validate";
const Login = () => {
    const [isLoaded,setIsLoaded]=useState(false);
    const toast=useToast();
    const navigate=useNavigate();
    const {values,handleChange,handleSubmit,errors}=useForm(login,LoginValidate)
    
    const [showPassword,setShowPassword]=useState(false);

    
    useEffect(()=>{
        setIsLoaded(true)
    },[])

    async function login(){
        const requestBody={
            login_id:values.email,
            password:values.password
        }
        try{
            const res=await fetchApi('login',requestBody,false);
            if(res.status===200){
                localStorage.setItem('token',res?.data?.access_token)
                toast({
                    title: 'User Successfully Logged In!',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                navigate('/');
            }
        }catch(err){
            console.log(err);
        }
        
        
    }
  return (
    <>
    {isLoaded?
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <div className='w-1/2 flex flex-col space-y-5 pb-10 justify-center items-center shadow-2xl'>
                <h1 className='text-xl m-4 p-4'>Log In to Proceed</h1>
                <div className='w-3/4'>
                    <InputGroup>
                        <Input
                            placeholder="Email" 
                            variant='flushed'
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
                    <InputGroup>
                        <Input
                            placeholder="Password" 
                            variant='flushed'
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
                <Button colorScheme='blue' variant='solid' onClick={handleSubmit}>
                    Log In
                </Button>
            </div>
        </div>
    :<Loader/>}
    </>
  )
}

export default Login