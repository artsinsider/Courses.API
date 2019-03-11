const fetch = require('node-fetch');

class getDataUsers  {
    constructor(url) {
        this.url = url;
    }

    async getUsers(id) {
        try{
            let response =  await fetch(`${this.url}/users/${id}`);
            return await response.json();
        } catch(error) {
            throw new Error('Не получилось получить данные пользователя')
        }
    }

    async getPosts(userId) {
        try{
            let response =  await fetch(`${this.url}/posts?userId=${userId}`);
            return await response.json();
        } catch(error) {
            throw new Error('Не получилось получить данные поста')
        }
    }

    async getComments(postId) {
        try{
            let response =  await fetch(`${this.url}/comments?postId=${postId}`);
            return await response.json();
        } catch(error) {
            throw new Error('Не получилось получить данные комментария')
        }
    }
}

module.exports = new getDataUsers('https://jsonplaceholder.typicode.com');