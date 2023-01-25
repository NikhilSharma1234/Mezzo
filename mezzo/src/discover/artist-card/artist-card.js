function ArtistPhoto (props) {
    return (
        <img className="ArtistPhoto" src={props.photoLink}/>
    ); 
}

function ArtistCard (props) {
    return (
      <article className="ArtistCard">
        <ArtistPhoto artist={props.artist}/>
        <h5>{props.artist}</h5>
      </article>
    );
}

function ArtistCards(props) {

}