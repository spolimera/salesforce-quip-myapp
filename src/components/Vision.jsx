import Styles from "./Vision.less";
import cx from "classnames";

export default class Vision extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        let rootRecord = quip.apps.getRootRecord();
        let vision = rootRecord.get("vision");
        console.log("@@@", Styles);
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
                        className={Styles.commentsTrigger}>
                        <quip.apps.ui.CommentsTrigger
                            record={vision}
                            showEmpty={true}
                        />
                    </span>
                </div>  
            </div>
        );
    }
}
