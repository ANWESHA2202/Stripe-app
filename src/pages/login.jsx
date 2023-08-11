import {useState,useEffect} from 'react'
import {Link, useNavigate } from 'react-router-dom';
import Loader from '../components/layout/loader';
import useForm from '../components/formControllers/useForm';
import fetchApi from "../components/fetchApi_data/fetchApi";
import mailLogo from '../assets/mail.png'
import hidePasswordLogo from '../assets/visibility.png'
import showPasswordLogo from '../assets/close-eye.png'
import { Input,InputGroup,Text,InputRightAddon, useToast ,Button} from '@chakra-ui/react'
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
            email:values.email,
            password:values.password
        }
        try{
            const res=await fetchApi('login',requestBody);
            if(res.status===200){
                localStorage.setItem('email',values.email)
                toast({
                    title: 'User Successfully Logged In!',
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
        <div className='w-full h-screen flex flex-col justify-center bg-blue-800 items-center'>
            <div className='w-1/3 flex flex-col space-y-5 pb-10 bg-white  justify-center items-center rounded-xl'>
                <h1 className='text-xl m-4 p-4'>Log In to Your Account</h1>
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
                <Button colorScheme='blue' variant='solid' className='w-3/4 bg-blue-800' onClick={handleSubmit}>
                    Log In
                </Button>
            <p>Don't Have an Account? <Link to='/signup' className='text-blue-700 underline'>Sign Up</Link>!</p>

            </div>
        </div>
    :<Loader/>}
    </>
  )
}

export default Login