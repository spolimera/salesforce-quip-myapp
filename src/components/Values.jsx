import Styles from "./Method.less";

export default class Values extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        let rootRecord = quip.apps.getRootRecord();
        let values = rootRecord.get("values");

        return (
            <div>
                <div className={Styles.title}>
                    VALUES 
                </div>

                <div className={Styles.method}>
                   <quip.apps.ui.RichTextBox
                     key={values.getId()}
                     record={values}
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
