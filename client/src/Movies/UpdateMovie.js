import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: []
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };
  onSubmit = id => {
    axios
      .post(`http://localhost:5000/api/movies/${id}`)
      //   .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  //   saveMovie = () => {
  //     const addToSavedList = this.props.addToSavedList;
  //     addToSavedList(this.state.movie);
  //   };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        {/* <div className="save-button" onClick={this.saveMovie}>
          Save
        </div> */}
        <form onSubmit={this.onSubmit}>
          <input
            name="id"
            type="text"
            value={this.state.movie.id}
            placeholder={this.props.id}
            onChange={this.handleChange}
          />
          <input
            name="title"
            type="text"
            value={this.state.movie.title}
            placeholder={this.props.title}
            onChange={this.handleChange}
          />
          <input
            name="director"
            type="text"
            value={this.state.movie.director}
            placeholder={this.props.director}
            onChange={this.handleChange}
          />
          <input
            name="metascore"
            type="text"
            value={this.state.movie.metascore}
            placeholder={this.props.metascore}
            onChange={this.handleChange}
          />
          <input
            name="stars"
            type="text"
            value={this.state.movie.stars}
            placeholder={this.props.stars}
            onChange={this.handleChange}
          />
          <button type="submit">Update Movie</button>
        </form>
      </div>
    );
  }
}
