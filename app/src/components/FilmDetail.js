import defaultCover from './images/default.png';
import likeImage from './images/like.png';
import dislikeImage from './images/dislike.png';

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import FilmsProvider from "../data/FilmsProvider";
import actions from "../actions.js";

const Title = styled.h2`
	color: #ffb301;
	margin-top: 0;
`;

const Panel = styled.div`
	display: flex;
	flex-direction: row;
	align-items: top;
	justify-content: center;
`;

const LeftPanel = styled.div`
	width: 33%;
	padding: 10px;
	text-align: center;
`;

const RightPanel = styled.div`
	width: 66%;
	padding: 10px;
`;

const Image = styled.img`
	display: inline-block;
	max-width: 100%;
	border-radius: 8px;
`;

const VoteButton = styled.img`
	width: 86px;
	margin: 40px;
	display: inline-block;
	cursor: pointer;
	opacity: 0.25;
	transition: all 0.3s ease-in-out;
	border: 2px solid #ffb301;
	border-radius: 50%;
	:hover {
		opacity: 1;
	}
	${(props) => (props.type == 'left') && `
		padding: 0px 5px 10px;
	`}
	${(props) => (props.type == 'right') && `
		padding: 10px 5px 0px;
	`}
	${(props) => props.voted && `
		box-shadow: 0 0 15px #ffb301;
		opacity: 1;
	`}
`;

function FilmDetail(props) {
	//console.log(props);

	let cover = defaultCover;
	if (props.image) {
		cover = "https://image.tmdb.org/t/p/w500" + props.image;
	}

	const [liked, setLiked] = useState(props.vote == 'good');
	const [disliked, setDisliked] = useState(props.vote == 'bad');

	const onLike = () => {
		if (liked) {
			FilmsProvider.delete(props.id);
			actions.showMessage('Película retirada de tu lista de pelis buenas.');
		} else {
			FilmsProvider.save(props, "good");
			actions.showMessage('Película añadida a tu lista de pelis buenas.');
		}
		setLiked(!liked);
		setDisliked(false);
		actions.reload();
	}
	const onDislike = () => {
		if (disliked) {
			FilmsProvider.delete(props.id);
			actions.showMessage('Película retirada de tu lista de pelis malas.');
		} else {
			FilmsProvider.save(props, "bad");
			actions.showMessage('Película añadida a tu lista de pelis malas.');
		}
		setDisliked(!disliked);
		setLiked(false);
		actions.reload();
	}

	return <>
		<Panel className="film-detail">
			<LeftPanel><Image src={cover}/></LeftPanel>
			<RightPanel>
				<Title>{props.title}</Title>
				<div>
					<p style={{color:"#ccc"}}>{props.overview}</p>
					<h3>¿Qué te ha parecido esta película?</h3>
					<div>
						<VoteButton className="vote-button" src={dislikeImage} type="left" voted={disliked} onClick={onDislike}/>
						<VoteButton className="vote-button" src={likeImage} type="right" voted={liked} onClick={onLike}/>
					</div>
				</div>
			</RightPanel>
		</Panel>
	</>;
}

export default FilmDetail;
