import profilePic from './profilePic.png'

function ArtistPhoto (props) {
    return (
        <img className="ArtistPhoto" src={profilePic}/>
    ); 
}

function ArtistCard (props) {
    return (
      <article className="ArtistCard">
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