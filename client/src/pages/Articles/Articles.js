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
      from: "",
      to: "",
      saved:{},
      articlesDisplayed:[]
    };

searchArticles = (topic, from, to ) => {
  this.setState({articlesDisplayed: [] })
  

  API.findNYTArticles(topic, from, to)
  .then(function(res) {


  })


}

    // searchArticles = event => {
    //     event.preventDefault();
        
    //     API.findArticles(this.state.title)
    //       .then(res => {
    //         let newArray = []
    //         this.setState({ articles: res.data.response.docs}); 
    //         console.log(this.state.articles); 
    //         this.state.articles.forEach(elem => {
    //         console.log(elem);
    //         this.setState({
    //                 saved:{
    //                     title:elem.headline.main,
    //                     date:elem.pub_date,
    //                     link:elem.web_url
    //                 }
    //             });
    //         console.log(this.state.saved);
    //         newArray.push(this.state.saved);
    //             API.saveArticles(this.state.saved)
    //             .then(res => {
    //                 console.log(res);
    //                 this.setState({
    //                     articlesDisplayed:newArray
    //                 })
		// 		})
    //         });
    //     })
    //     this.loadSavedArticles();
    // };
    

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };
      
      saveArticle = (article) => {
       
        API.saveArticles( {
          title: article.title,
          date: article.date,
          url: article.url,
          saved: true
        })
        .then(res => this.loadSavedArticles())
        .catch(err => console.log(err));
       
        
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
    if(this.state.topic && this.state.from && this.state.to) {
      this.searchArticles(this.state.topic, this.state.from, this.state.to)
    }
  };
  


      render() {
        return (
          <Container>
           
            <Row >
              {/* <button className="btn btn-danger" onClick={this.handleFormSubmit} /> */}
             <Col size="md-12">
             <form>
             <h4>Topic</h4>
              <Input
              
                value={this.props.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="hello"
              />
             <Input
                value={this.state.from}
                onChange={this.handleInputChange}
                name="from"
                placeholder="date from"
              />
              <Input
                value={this.state.to}
                onChange={this.handleInputChange}
                name="to"
                placeholder="date to"
              />
              <FormBtn
                // disabled={!(this.state.topic && this.state.from && this.state.to)}
                onClick={this.handleFormSubmit} 
                
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