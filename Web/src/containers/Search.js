import React, { Component } from 'react'
import axios from 'axios'
import {notify} from 'react-notify-toast';
import Movies from 'components/Movies'

const API_URL = 'http://localhost:3001'
var keyword = ''
class Search extends Component {
  state = {
    error: false,
    query: '',
    results: []
  }

  componentDidMount() {
    notify.show('Initial', '', 2000);
    window.onscroll = this.handleScroll;
  }
  
  handleScroll() {
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop'
    
    let percentageScrolled = (h[st]||b[st]) / (h.clientHeight) * 10;

    var movieNames = document.getElementsByClassName('card-media-tag');
    
    if (movieNames.length) {
      var widthOfScreen = document.getElementById('root').offsetWidth;
      // It will show 2 if width smaller than 768
      var counter = widthOfScreen <= 768 ? 2 : 3;
      for (var index = Math.floor(percentageScrolled / (counter/2)) * counter; index < (Math.floor(percentageScrolled / (counter/2)) * counter) + counter; index++) {
        // control the if it is viewed
        var movieIndex = index;
        if(!movieNames[movieIndex].hasAttribute('viewed')) {
          movieNames[movieIndex].setAttribute('viewed', true);
          console.log("Movie view:" + movieNames[movieIndex].innerText + percentageScrolled);
        }
      }
    }
  }


  getInfo = () => {
    axios.get(`${API_URL}/api/search?keyword=${this.state.query}`)
      .then(({ data }) => {
        if (data.Response == "True") {
          this.setState({
            results: data.Search
          })
          notify.show('Loaded!', 'success', 2000)
        } else {
          this.setState({
            results: []
          })
          notify.show('No result', 'warning', 2000)
        }        
      })
      .catch(() => {
        notify.show('Error!', 'error', 2000)
        this.setState({ error: true })
      })
  }

  handleInputChange = () => {
    if (keyword !== this.search.value) {
      keyword = this.search.value
    }
    
    setTimeout(() => {
      if (keyword === this.search.value) {
        this.setState({
          query: this.search.value
        }, () => {
          if (this.state.query && this.state.query.length >= 3) {
            this.getInfo()                
          }
        })
      }
    }, 300)
  }

  render() {
    return (
      <div class="app">
        <form>
          <div class="inner-form">
            <h2>Please type to search </h2>
            <div class="input-field">
              <input id="search"
                placeholder="Search for..."
                ref={input => this.search = input}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <Movies results={this.state.results} />
        </form>
      </div>
      
    )
  }
}

export default Search
