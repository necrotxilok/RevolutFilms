import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import actions from "../actions.js";

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 50;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const OverlayBG = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0,0,0,0.6);
	opacity: 0;
`;

const Scroll = styled.div`
	width: 100%;
	${(props) => !props.hiding && `
		overflow-x: hidden;
		overflow-y: auto;
	`}
`;

const Dialog = styled.div`
	box-sizing: border-box;
	padding: 20px;
	margin: 40px auto;
	min-height: 300px;
	width: 700px;
	max-width: 100%;
	position: relative;
	background-color: #1b1c1e;
	color: #fff;
	border-radius: 8px;
	box-shadow: 0 5px 10px rgba(0,0,0,0.6);
	transform: translateY(125vh);
`;

const Close = styled.button`
	position: absolute;
	top: -20px;
	right: 20px;
	border-radius: 50%;
	border: none;
	width: 42px;
	height: 42px;
	padding: 10px;
	box-sizing: border-box;
	font-size: 20px;
	background-color: #ffb301;
	font-weight: bold;
	cursor: pointer;
	transition: all 0.1s ease;
	&:hover {
		transform: scale(1.1);
	}
	${(props) => props.hiding && `
		transform: scale(0);
	`}
`;

function Modal({children}) {
	const overlay = useRef();
	const dialog = useRef();

	const [opening, setOpening] = useState(true);
	const [closing, setClosing] = useState(false);
	const onClose = () => {
		if (opening || closing) {
			return;
		}
		setClosing(true);
	}

	useEffect(() => {
		// Opening (ComponentDidMount)
		gsap.to(overlay.current, {
			duration: 1.5,
			opacity: 1
		});
		gsap.to(dialog.current, {
			duration: 0.5,
			ease: "back.inOut",
			transform: "translateY(0)",
			onComplete: () => {
				setOpening(false);
			}
		});
	});

	useEffect(() => {
		if (!closing) {
			return;
		}
		// Closing
		gsap.to(overlay.current, {
			duration: 0.5,
			opacity: 0,
			onComplete: () => {
				actions.closeModal();
			}
		});
		gsap.to(dialog.current, {
			duration: 0.5,
			ease: "back.inOut",
			transform: "translateY(125vh)"
		});
	}, [closing])

	return <Overlay>
		<OverlayBG ref={overlay} onClick={onClose}/>
		<Scroll hiding={opening || closing} className="modal-scroll">
			<Dialog ref={dialog} className="modal-dialog">
				<Close onClick={onClose} hiding={opening || closing} className="modal-close">X</Close>
				{children}
			</Dialog>
		</Scroll>
	</Overlay>
}

export default Modal;
