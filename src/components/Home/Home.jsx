import './Home.css';

const Home = ({user}) => {
    return <div className='homepage'>
        <p className='welcomeMessage'>WELCOME!</p>
        <p className='welcomeMessage'> Logged in as: {user}</p>
    </div>
}

export default Home;