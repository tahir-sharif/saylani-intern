import './style.css'
import { useNavigate } from 'react-router'

const NoUser = () => {
    const navigate = useNavigate()
    return (
        <div className='noUser'>
            <h3><span className='link' onClick={() => {
                navigate('/signup')
            }}>Signup</span>  or <span className='link' onClick={() => {
                navigate('/login')
            }}>Login</span> your Account to access this Page</h3>
        </div>
    )
}

export default NoUser
