import Styles from "./Method.less";
import Chevron from "quip-apps-chevron";
import cx from "classnames";

export default class Method extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        methods: this.getMethods()
      };
    }

    handleClick = (e, method) => {
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
          { method, callback: this.deleteRow.bind(this)},
        );
    }

    addRow(){
      let methods = this.getMethods();
      methods.add({
          title: {
              RichText_placeholderText:"Add Method Title",
          },
          description: {
              RichText_placeholderText:"Add Method Description",
          },
      });

      this.setState({
          methods: methods
      });
    }

    deleteRow() {
        let methods = this.getMethods();
        this.setState({
            methods
        });
    }

    getMethods() {
        let methods = quip.apps.getRootRecord().get("methods");
        return methods;
    }
    
    render() {
        let methods = this.state.methods;
        let rootRecord = quip.apps.getRootRecord();

        return (
            <div>
                <div className={Styles.title}>
                    METHODS 
                </div>

                <div >
                    <table className={Styles.method}>
                        {   
                            methods && methods.getRecords().map((method) => {
                                return(
                                    <div className={Styles.eachMethod}>
                                    <tr className={Styles.tableRow}>
                                        <td>
                                            <b>Method Title</b>
                                        </td>

                                        <td className={Styles.tableCell}>
                                            <quip.apps.ui.RichTextBox
                                             key={method.getId()}
                                             record={method.get("title")}
                                             color={"BLUE"}
                                             width={770}
                                             minHeight={50}
                                             maxHeight={280}
                                             align={"center" }  
                                            />

                                            <span 
                                            ref={(c) => method.get("title").setDom(c)}
                                            className={cx(Styles.commentsTrigger, {
                                                [Styles.commented]:
                                                method.get("title").getCommentCount() > 0,
                                            })}>
                                             <quip.apps.ui.CommentsTrigger
                                               record={method.get("title")}
                                               showEmpty={true}
                                              />
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className={Styles.tableRow}>
                                        <td>
                                            <b>Method Description</b>
                                        </td>
                                        <td className={Styles.tableCell}>
                                            <quip.apps.ui.RichTextBox
                                             key={method.getId()}
                                             record={method.get("description")}
                                             color={"BLUE"}
                                             width={770}
                                             minHeight={50}
                                             maxHeight={280}
                                             align={"center" }  
                                            />

                                           <span 
                                                className={Styles.chevron}
                                                onClick={(e) => this.handleClick(e, method)}
                                                style={{ float: "left" }}
                                                >
                                                <Chevron
                                                    color={
                                                        method
                                                            ? quip.apps.ui.ColorMap.BLUE.VALUE
                                                        : quip.apps.ui.ColorMap[color].VALUE
                                                    }
                                                    />
                                            </span>

                                            <span 
                                            ref={(c) => method.get("description").setDom(c)}
                                            className={cx(Styles.commentsTrigger, {
                                                [Styles.commented]:
                                                method.get("description").getCommentCount() > 0,
                                            })}
                                            style={{ float: "left" }}
                                            >
                                             <quip.apps.ui.CommentsTrigger
                                               record={method.get("description")}
                                               showEmpty={true}
                                              />
                                            </span>
                                        </td>
                                    </tr>
                                </div>
                                );

                            })
                        }
                    </table>  
                </div>

                <button onClick={this.addRow.bind(this)} style={{ width: "15%" }}>
                    Add Method
                </button>       
            </div>

        );
    }
}
