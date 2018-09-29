import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import {  List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import  SaveBtn  from "../../components/SaveBtn";



class Articles extends Component {
    state = {
      articles: [],
      title: "",
      date: "",
      url: "",
      saved:{},
      articlesDisplayed:[]
    };


    searchArticles = event => {
        event.preventDefault();
        API.findArticles(this.state.title)
          .then(res => {
            let newArray = []
            this.setState({ articles: res.data.response.docs}); 
            console.log(this.state.articles); 
            this.state.articles.forEach(elem => {
            console.log(elem);
            this.setState({
                    saved:{
                        title:elem.headline.main,
                        date:elem.pub_date,
                        link:elem.web_url
                    }
                });
            console.log(this.state.saved);
            newArray.push(this.state.saved);
                API.saveArticles(this.state.saved)
                .then(res => {
                    console.log(res);
                    this.setState({
                        articlesDisplayed:newArray
                    })
				})
            });
        })
        this.loadSavedArticles();
    };
    

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };
      saveArticle = (article) => {
        API.updateArticles( {
            title: this.title,
            date: this.date,
            url: this.url,
            saved: true
        })
        
    };
    loadSavedArticles = () => {
		API.getArticles()
			.then(res => {
				this.setState({ articles: res.data })
			}).catch(err => console.log(err))
	};

   
      

     
// 
handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.saveArticle({
        title: this.state.headline,
        date: this.state.date,
        url: this.state.url
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };
    


      render() {
        return (
          <Container>
           
            <Row >
              <button className="btn btn-danger" onClick={this.handleFormSubmit} />
             <Col size="md-12">
             <form>
             <h4>Topic</h4>
              <Input
              type= "text"
                value={this.props.value}
                onChange={this.handleInputChange}
                name="title"
                placeholder="hello"
              />
             
              <FormBtn
                // disabled={!(this.state.topic && this.state.startYear && this.state.endYear)}
                onClick={this.searchArticles} 
                
              >
              
                Search
              </FormBtn>
           
              </form>
              <List>
              <Col size="md-12">
            {this.state.articles.length ? (
              <div className="panel panel-primary">
                <div className="panel-heading"><h4>Results</h4></div>
                <div className="panel-body">
                <List>
                    {this.state.articlesDisplayed.map(article => (
                      <ListItem
                        key={article._id}
                        title={article.title}
                        link={article.link}
                        date={article.date}>
                        {/* <button  onClick={() => this.saveArticle(article)}/> */}
                      
                        <SaveBtn  onClick={() => this.saveArticle(article._id)}/>
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
               
              </List>
              </Col>
                </Row>
                </Container>
        )}};














      export default Articles;