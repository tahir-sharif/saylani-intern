import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import './auth.css'
// import { auth } from '../../firebase/Firebase';


const Login = () => {
    return (
        <>
            <Box
                autoComplete="off"
            >
                <div className='form login'>
                    <div className='formHeading'>Login</div>
                    <div className="inputFields">
                        <Input placeholder="Email" autoFocus='true' />
                        <Input placeholder="Password" />
                    </div>
                    <div className="button">
                        <Button variant="contained" color="success">
                            Login
                        </Button>
                    </div>
                </div>
            </Box>        </>
    )
}

export default Login
