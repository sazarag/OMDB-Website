import React from 'react'

const Movies = (props) => {
  const options = props.results.map(r => (
    <div key={r.imdbID} class="card">
      <div class="card-media">
        <img src={r.Poster} alt="" class="card-media-img" />
        <div class="card-media-tag-cover">
        <span class="card-media-tag">{r.Title}</span>
        </div>
      </div>
    </div>
  ))

  return <div class="container">{options}</div>
}


export default Movies
