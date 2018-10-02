import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import {  List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import  SaveBtn  from "../../components/SaveBtn";
import { Link } from "react-router-dom";



class Articles extends Component {
    state = {
      articles: [],
      topic: "",
      from: "",
      to: "",
      saved:{},
      articlesDisplayed:[]
    };
    componentDidMount() {
      this.loadArticles();
      this.searchArticles("Orlando", "20170101", "20180101");
    }


searchArticles = (topic, from, to ) => {
  
  let results = this;
  

  API.findNYTArticles(topic, from, to)
  .then(function(res) {

    if(res) {
      let data = [];
      
      for (var i=0; i<(5>res.data.response.docs.length ? (res.data.response.docs.length) : 10); i++){
      var url = res.data.response.docs[i].web_url;
      var title = res.data.response.docs[i].headline.main;
      var pub_date = res.data.response.docs[i].pub_date;
      var id = res.data.response.docs[i]._id;
      var newdata = {
        _id: id,
        title: title,
        url: url,
        pub_date: pub_date
      }
      data.push(newdata);
      }
      
      results.setState({articlesDisplayed: data});
      console.log(data); 
      
    }
  })
};
  




    
    

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };
      
    

    saveArticle = (article) => {
      let newArticle = {
        title: article.title,
        
        date: article.date,
        link: article.url,
        saved: true
      }
  
      API
        .saveArticles(newArticle)
        .then(results => {
          console.log(results);
          
        })
        .catch(err => console.log(err));
    }
  
  loadArticles(){
    API.getArticles()
    .then(res =>
      this.setState({ articles: res.data, topic: "", from: "", to: ""})
    )
    .catch(err => console.log(err));
  }

   
      

     
// 
handleFormSubmit = event => {
    event.preventDefault();
    if(this.state.topic && this.state.from && this.state.to) {
      this.searchArticles(this.state.topic, this.state.from, this.state.to)
    }
  };
  


      render() {
        return (
          <Container>
           
            <Row >
              
             <Col size="md-12">
             <form>
             <h4 id="results">Topic to Search</h4>
              <Input
              
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="topic"
              />
             <Input
                value={this.state.from}
                onChange={this.handleInputChange}
                name="from"
                placeholder="date from YYYYMMDD"
              />
              <Input
                value={this.state.to}
                onChange={this.handleInputChange}
                name="to"
                placeholder="date to YYYYMMDD"
              />
              <FormBtn
                disabled={!(this.state.topic && this.state.from && this.state.to)}
                onClick={this.handleFormSubmit} 
                
              >
              
                Search
              </FormBtn>
           
              </form>
              {/* <List> */}
              <Col size="md-12">
            {this.state.articles.length ? (
              <div className="panel panel-primary">
                <div className="panel-heading"><h4 id="results">Results</h4></div>
                <div className="panel-body">
                <List>
                    {this.state.articlesDisplayed.map(article => (
                      <ListItem
                        key={article._id}>
                        <Link to={article.url} target="_blank">
                        <strong>
                          {article.title}
                        </strong>
                        <p>Published on: {article.pub_date}</p>
                        
                        </Link>
                        <SaveBtn  onClick={() => this.saveArticle(article)}/>
                      </ListItem>))}
                  </List>
                </div>
              </div>
              ) : (
              <ul className="list-group">
                <li className="list-group-item"><h3><em>Enter Search Term to Begin</em></h3></li>
              </ul>)
            }
          </Col>
               
              {/* </List> */}
              </Col>
                </Row>
                </Container>
        )}};














      export default Articles;