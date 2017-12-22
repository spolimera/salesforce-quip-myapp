import Styles from "./Method.less";
import Chevron from "quip-apps-chevron";
import cx from "classnames";

export default class Values extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        values: this.getValues()
      };
    }

    handleClick = (e, value) => {
      const { canAdd, canDelete } = this.state;
      const disabledCommands = [];

      quip.apps.showContextMenu(
          e,
          [
              "deleteMethod", // id from menuCommand in Initialization,
              quip.apps.DocumentMenuCommands.SEPARATOR,
              quip.apps.DocumentMenuCommands.DELETE_APP,
          ],
          [], // No highlighted commands
          disabledCommands, // Disabled commands based on state
          () => {},
          { value, callback: this.deleteRow.bind(this)},
        );
    }

    addRow(){
      let values = this.getValues();
      values.add({

      });

      this.setState({
          values: values
      });
    }

    deleteRow() {
        let values = this.getValues();
        this.setState({
            values
        });
    }

    getValues() {
        let values = quip.apps.getRootRecord().get("values");
        return values;
    }
    
    render() {
        let values = this.state.values;
        let rootRecord = quip.apps.getRootRecord();

        return (
            <div>
                <div className={Styles.title}>
                    VALUES 
                </div>

                <div>
                    <table className={Styles.method}>
                        {   
                            values && values.getRecords().map((value) => {
                                return(
                                  <tr className={Styles.eachMethod}>
                                     <td>
                                       <quip.apps.ui.RichTextBox
                                           key={value.getId()}
                                           record={value}
                                           color={"BLUE"}
                                           width={770}
                                           minHeight={50}
                                           maxHeight={280}
                                           align={"center" }  
                                          />
                                     </td>     
                                  </tr>
                                );

                            })
                        }
                    </table>  
                </div>

                <button onClick={this.addRow.bind(this)} style={{ width: "15%" }}>
                    Add Value
                </button>       
            </div>
        );
    }
}
