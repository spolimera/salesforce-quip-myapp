import Styles from "./Method.less";
import Chevron from "quip-apps-chevron";
import cx from "classnames";

export default class Vision extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        vision: this.getVision()
      };
    }

    handleClick = (e, vision) => {
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
          { vision, callback: this.deleteRow.bind(this)},
        );
    }

    addRow(){
      let vision = this.getVision();
      vision.add({

      });

      this.setState({
          vision: vision
      });
    }

    deleteRow() {
        let vision = this.getVision();
        this.setState({
            vision
        });
    }

    getVision() {
        let vision = quip.apps.getRootRecord().get("vision");
        return vision;
    }
    
    render() {
        let vision = this.state.vision;
        let rootRecord = quip.apps.getRootRecord();

        return (
            <div>
                <div className={Styles.title}>
                    VISION 
                </div>

                <div>
                    <table className={Styles.method}>
                        {   
                            vision && vision.getRecords().map((visionItem) => {
                                return(
                                  <tr className={Styles.eachMethod}>
                                     <td>
                                       <quip.apps.ui.RichTextBox
                                           key={visionItem.getId()}
                                           record={visionItem}
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
                    Add Vision
                </button>       
            </div>

        );
    }
}
