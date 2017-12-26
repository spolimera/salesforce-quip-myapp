import Styles from "./Method.less";

export default class Vision extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        let rootRecord = quip.apps.getRootRecord();
        let vision = rootRecord.get("vision");

        return (
            <div>
                <div className={Styles.title}>
                    VISION 
                </div>

                <div className={Styles.method}>
                   <quip.apps.ui.RichTextBox
                     key={vision.getId()}
                     record={vision}
                     color={"BLUE"}
                     width={770}
                     minHeight={50}
                     maxHeight={280}
                     align={"center" }  
                    />
                </div>  
            </div>
        );
    }
}
