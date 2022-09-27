import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import requests from '../../utils/requests';
import './Nav.css';

const Nav = () => {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        requests.getTopics()
        .then((res) => {
            setTopics(res);
            setIsLoading(false);
        })
    },[])

    return <div className='navBar'>
        <Link className='navBarLink' to='/'>Home</Link>
        <Link className='navBarLink' to='/articles'>All articles</Link>
        {isLoading?null:
            topics.map((topic) => {
                return <Link className='navBarLink' key={topic.slug} to={`/articles/${topic.slug}`}>{topic.slug}</Link>
            })
        }
        </div>
}

export default Nav;