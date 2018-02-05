import React from "react";

import AlertStyles from "./Alert.less";

export default class Alert extends React.Component {
	componentDidMount() {
		document.body.classList.add(AlertStyles.disabled);
	}

	componentWillUnmount() {
		document.body.classList.remove(AlertStyles.disabled);
	}

	render() {
		return(
			<div className={AlertStyles.dialogueBox}>
				<div className={AlertStyles.dialogueBoxTitle}>
					{this.props.title}
				</div>
				<div className={AlertStyles.dialogueBoxBody}>
					{this.props.body}
				</div>
				<div className={AlertStyles.dialogueBoxFooter}>
					<button className={AlertStyles.dialogueBoxCancel} onClick={this.props.cancel}>
						Cancel
					</button>
				</div>
			</div>
		);
	}
}