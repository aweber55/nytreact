import axios from "axios";
const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const APIKEY = '7510b56d067045d2a7d0adb6b8abad63';


export default {
  // Gets all books
  getArticles: function() {
    return axios.get("/api/articles");
  },

  deleteArticles: function(id) {
    return axios.delete("/api/articles/" + id);
  },

  saveArticles: function(articleData) {
    
    return axios.post("/api/articles", articleData);
    
  },

  updateArticles: function(id) {

    return axios.put(`/api/articles/${id}`);
  },

  findArticles: function(topic, date, url) {
      console.log(topic, date, url);
      return axios.get(`${BASEURL}?api-key=${APIKEY}`);
      
  }
};