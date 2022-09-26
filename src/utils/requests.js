import axios from 'axios';

const newsApi = axios.create({baseURL: 'https://tomnews.herokuapp.com/api'})

// const getArticles = () => {
//     return newsApi.get('/articles').then(({data}) => {
//         return data.articles;
//     })
// }

const getArticles = (topic) => {
    return newsApi.get('/articles/', {params:{topic: topic}}).then(({data}) => {
        return data.articles;
    })
}

const getTopics = () => {
    return newsApi.get('/topics').then(({data}) => {
        return data.topics;
    })
}

export default {getArticles, getTopics};