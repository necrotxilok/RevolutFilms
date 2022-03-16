import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

import actions from "../actions.js";

const Container = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 20px;
	z-index: 100;
	display: flex;
	align-items: center;
	justify-content: center;
	transform: translateY(100px);
`;

const AlertBox = styled.div`
	padding: 10px 30px;
	color: #000;
	background-color: #ffb301;
	border-radius: 8px;
`;

let timer = null;

function Toast({message}) {
	const container = useRef();

	useEffect(() => {
		//console.log('Show Toast Message:', message);
		const show = () => {
			// Load
			gsap.to(container.current, {
				duration: 0.3,
				ease: "power2.inOut",
				transform: "translateY(0)",
				opacity: 1,
				onComplete: () => {
					// Unload
					timer = setTimeout(() => {
						gsap.to(container.current, {
							duration: 0.3,
							ease: "power2.inOut",
							transform: "translateY(100px)",
							opacity: 0,
							onComplete: () => {
								actions.showMessage(null);
							}
						});
					}, 3000);
				}
			});
		}
		if (timer) {
			clearTimeout(timer);
			// Clean
			gsap.to(container.current, {
				duration: 0.3,
				ease: "power2.inOut",
				transform: "translateY(100px)",
				opacity: 0,
				onComplete: show
			});
		} else {
			show();
		}
	}, [message]);

	return <Container ref={container}>
		<AlertBox>{message}</AlertBox>
	</Container>
}

export default Toast;
