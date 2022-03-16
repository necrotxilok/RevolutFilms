import empty from './images/empty.png';
import defaultCover from './images/default.png';
import likeImage from './images/like.png';
import dislikeImage from './images/dislike.png';

import actions from "../actions";
import FilmsProvider from "../data/FilmsProvider";

function FilmItem(props) {
	let cover = defaultCover;
	if (props.image) {
		cover = "https://image.tmdb.org/t/p/w500" + props.image;
	}

	const vote = FilmsProvider.getVote(props);

	const onOpenCard = () => {
		const vote = FilmsProvider.getVote(props);
		//console.log('vote?', vote);
		actions.openModal({...props, vote});
	}

	return <div className="film-item" id={props.id}>
		<div className="film-card" onClick={onOpenCard}>
			<div className="film-image" style={{backgroundImage:"url(" + cover + ")"}}>
				<img src={empty} />
			</div>
			{vote && <div className={"vote " + vote}>
				{(vote == 'good') && <img src={likeImage}/>}
				{(vote == 'bad') && <img src={dislikeImage}/>}
			</div>}
			<h3>{props.title}</h3>
		</div>
	</div>;
}

export default FilmItem;
