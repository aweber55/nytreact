import React, { Component } from "react";
// import React from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import {  List, ListItem } from "../../components/List";
import "./SavedArticles.css";
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
        <Col size="md-12 sm-12">
        <div className="panel panel-primary">
                <div className="panel-heading saved-heading"><h4 id="SvdArt">Saved Articles</h4></div>
                <div className="panel-body">
              {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={article.link} target="_blank">
                      <strong>
                        Title: {article.title} 
                        
                        <br/>Saved at: {article.date}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
               
               
              </List>
              
            ) : (
              <h3>No Results to Display</h3>
            )}
            </div>
            </div>
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