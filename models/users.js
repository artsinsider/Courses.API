const fetch = require('node-fetch');

class getDataUsers  {
    constructor(url) {
        this.url = url;
    }

    /**
     * Getting user data
     * @param id - user id
     * @returns {Promise.<*>}
     */
    async getUsers(id) {
        try{
            let response =  await fetch(`${this.url}/users/${id}`);
            return await response.json();
        } catch(error) {
            throw new Error('Не получилось получить данные пользователя')
        }
    }

    /**
     * Getting posts user
     * @param userId - identifier user
     * @returns {Promise.<*>}
     */
    async getPosts(userId) {
        try{
            let response =  await fetch(`${this.url}/posts?userId=${userId}`);
            return await response.json();
        } catch(error) {
            throw new Error('Не получилось получить данные поста')
        }
    }

    /**
     * Getting comments of the user
     * @param postId
     * @returns {Promise.<*>}
     */
    async getComments(postId) {
        try{
            let response =  await fetch(`${this.url}/comments?postId=${postId}`);
            return await response.json();
        } catch(error) {
            throw new Error('Не получилось получить данные комментария')
        }
    }

    async comment(id) {
        let users = await this.getUsers(id);
        let posts = await this.getPosts(users.id);
        let comment = await this.getComments(posts[0].id);
        return {users, posts, comment}
    };
}

module.exports = new getDataUsers('https://jsonplaceholder.typicode.com');
