import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import './auth.css'
import { app } from '../../firebase/Firebase';

const Signup = () => {
  console.log(app)
  return (
    <Box
      autoComplete="off"
    >
      <div className='form signup'>
        <div className='formHeading'>Sign Up</div>
        <div className="inputFields">
          <Input placeholder="User name" autoFocus='true' />
          <Input placeholder="Email" />
          <Input placeholder="Password" />
        </div>
        <div className="button">
          <Button variant="contained" color="success">
            Sign up
          </Button>
        </div>
      </div>
    </Box>
  )
}

export default Signup
