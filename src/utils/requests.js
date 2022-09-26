import axios from 'axios';

const newsApi = axios.create({baseURL: 'https://tomnews.herokuapp.com/api'})

const getArticles = () => {
    return newsApi.get('/articles').then(({data}) => {
        return data;
    })
}

export default {getArticles};