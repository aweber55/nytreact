import React, { Component } from "react";
// import React from "react";
import { Link } from "react-router-dom";
// import { Col,  Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import {  List, ListItem } from "../../components/List";
// import { Input, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";



class SavedArticles extends Component {
        state = {
          articles: [],
          topic: "",
          from: "",
          to: "",
          saved:{},
          articlesDisplayed:[]
        };
        // componentDidMount() {
        // //   this.loadArticles();
        //   this.searchArticles("Trump", "20170101", "20180101");
        // }
        componentDidMount() {
                this.loadArticles();
              }
              loadArticles(){
                API.getArticles()
                .then(res =>
                  this.setState({ articles: res.data, topic: "", from: "", to: ""})
                )
                .catch(err => console.log(err));
              }
            
              deleteArticle = id => {
                API.deleteArticles(id)
                  .then(res => this.loadArticles())
                  .catch(err => console.log(err));
              };

              

        render() {
                return (
        <Container fluid>
        <Row>
          <Col size="md-12">
           
              {/* <h1>
                {this.state.articles} by {this.state.articles}
              </h1>
             */}
          </Col>
        </Row>
        <Row>
        <Col size="md-12 sm-12">
            {/* <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron> */}
              {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    {/* <Link to={article.url} target="_blank"> */}
                      <strong>
                        Title: {article.title} 
                        <br/>Link: {article.web_url} 
                        <br/>Saved at: {article.date}
                      </strong>
                    {/* </Link> */}
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Articles</Link>
          </Col>
        </Row>
      </Container>
    );
    
}}
    export default SavedArticles;