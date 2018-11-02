import React from 'react';
import { GENRES } from "../../constants/genres";
import { withInjector } from '../angular-adapters/withInjector';

function GenreSelector({ $state })  { return (
  <div className="genre-selector">
    <h3 className="title">Charts By Genre</h3>
    <div className="btn-group">
      {GENRES
        .map(genre => (
          <button
            key={ genre.link }
            onClick={() => $state.go("charts", { genre: genre.link }, { reload:true })}
            className="button inline"
          >
            {genre.title}
          </button>
        ))}
    </div>
  </div>
);
}

export default withInjector(['$state'])(GenreSelector);
