import profilePic from './profilePic.png'
import './artist-card.scoped.css'

function ArtistPhoto (props) {
    return (
        <img className="artist-photo" src={profilePic}/>
    ); 
}

function ArtistCard (props) {
    return (
      <article className="artist-card">
        <ArtistPhoto/>
        <h3>{props.details.artist}</h3>
      </article>
    );
}

function ArtistCards(props) {
  return (
    <div>
      <header></header>
      <div className="app-card-list" id="app-card-list">
        {
          Object
          .keys(props.posts)
          .map(key => <ArtistCard key={key} index={key} details={props.posts[key]}/>)
        }
      </div>
    </div>
  );
}

export default ArtistCards