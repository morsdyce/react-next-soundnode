import React from 'react';
import { GENRES } from "../../constants/genres";
import { withRouter } from 'react-router';

function GenreSelector({ history })  { return (
  <div className="genre-selector">
    <h3 className="title">Charts By Genre</h3>
    <div className="btn-group">
      {GENRES
        .map(genre => (
          <button
            key={ genre.link }
            onClick={() => history.push(`/charts/${genre.link}`)}
            className="button inline"
          >
            {genre.title}
          </button>
        ))}
    </div>
  </div>
);
}

export default withRouter(GenreSelector);
