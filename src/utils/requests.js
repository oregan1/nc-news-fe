import axios from 'axios';

const newsApi = axios.create({baseURL: 'https://tomnews.herokuapp.com/api'})


const getArticles = (topic, sort_by, order) => {
    return newsApi.get('/articles/', {params:{topic: topic, sort_by: sort_by, order: order}}).then(({data}) => {
        return data.articles;
    })
}

const getArticle = (id) => {
    return newsApi.get(`/articles/${id}`).then(({data}) => {
        return data.article;
    })
} 

const getTopics = () => {
    return newsApi.get('/topics').then(({data}) => {
        return data.topics;
    })
}

const addVotes = (id, input) => {
    return newsApi.patch(`/articles/${id}`, input).then(({data}) => {
        return data.article;
    })
}

const getComments = (id) => {
    return newsApi.get(`/articles/${id}/comments`).then(({data}) => {
        return data.comments;
    })
}

const addComment = (id, input) => {
    return newsApi.post(`/articles/${id}/comments`, input).then(({data}) => {
        return data.comment;
    })
}

const deleteComment = (id) => {
    return newsApi.delete(`/comments/${id}`).then(({data}) => {
        return data.comment;
    })
}

export default {getArticles, 
    getTopics, 
    getArticle, 
    addVotes, 
    getComments,
    addComment, 
    deleteComment};