import {Link} from 'react-router-dom';

const Nav = () => {
    return <div>
        <Link to='/'>Home</Link>
        <Link to='/articles'>All articles</Link>
    </div>
}

export default Nav;