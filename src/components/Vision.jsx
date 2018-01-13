import Styles from "./Vision.less";
import cx from "classnames";

export default class Vision extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
        let vision = this.getVision();
        vision.setCallback(() => {
            this.setState({});
        });
    }

    render() {
        let vision = this.getVision();

        return (
            <div>
                <div className={Styles.title}>
                    VISION 
                </div>

                <div className={Styles.vision}>
                   <quip.apps.ui.RichTextBox
                     key={vision.getId()}
                     record={vision}
                     color={"BLUE"}
                     width={470}
                     minHeight={50}
                     maxHeight={280}
                     align={"center" }  
                    />

                    <span 
                        ref={(c) => vision.setDom(c)}
                        className={cx(Styles.commentsTrigger, {
                                    [Styles.commented]:
                                    vision.getCommentCount() > 0,
                                })}>
                        <quip.apps.ui.CommentsTrigger
                            record={vision}
                            showEmpty={true}
                        />
                    </span>
                </div>  
            </div>
        );
    }

    getVision() {
        return quip.apps.getRootRecord().get("vision");
    }
}
