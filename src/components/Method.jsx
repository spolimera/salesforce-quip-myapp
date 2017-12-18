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
            <div >
                <div className={Styles.title}>
                    METHODS 
                </div>

                <table>
                    {   
                        methods && methods.getRecords().map((method) => {
                            return(
                                <div  className={cx(Styles.method, {
                                        [Styles.method]: method,
                                    })}
                                    ref={node => {
                                        this._node = node;
                                        method.setDom(node);
                                    }}>
                                    <thead>
                                        <tr className={Styles.tableRow}>
                                            <td className={Styles.methodHeader}>
                                                Method Title
                                            </td>
                                            <td className={Styles.tableCell}>
                                                <quip.apps.ui.RichTextBox
                                                    key={method.getId()}
                                                    record={method.get("title")}
                                                    color={"BLUE"}
                                                    width={200}
                                                    minHeight={50}
                                                    maxHeight={280}
                                                    align={"center" }  
                                                    />
                                            </td>

                                        </tr>

                                        <tr className={Styles.tableRow}>
                                            <td className={Styles.methodHeader}>
                                                Method Description
                                            </td>
                                            <td className={Styles.tableCell}>
                                                <quip.apps.ui.RichTextBox
                                                    key={method.getId()}
                                                    record={method.get("description")}
                                                    color={"BLUE"}
                                                    width={695}
                                                    minHeight={50}
                                                    maxHeight={280}
                                                    align={"center" }  
                                                    /> 

                                            </td>
                                            <thead className={Styles.commentCell}>
                                                <td>
                                                    <span 
                                                        // className={Styles.showContextMenu}
                                                        className={Styles.chevron}
                                                        onClick={(e) => this.handleClick(e, method)}
                                                        >
                                                        <Chevron
                                                            color={
                                                                method
                                                                    ? quip.apps.ui.ColorMap.BLUE.VALUE
                                                                : quip.apps.ui.ColorMap[color].VALUE
                                                            }
                                                            />
                                                    </span> 

                                                </td>
                                                <td>
                                                    <div
                                                        className={cx(Styles.commentsTrigger, {
                                                            [Styles.commented]:
                                                            method.getCommentCount() > 0,
                                                        })}

                                                        >
                                                        <quip.apps.ui.CommentsTrigger
                                                            //className={Styles.comments}

                                                            record={method}
                                                            showEmpty={true}
                                                            color={"BLUE"}
                                                            />
                                                    </div>
                                                </td>
                                            </thead>
                                        </tr>
                                    </thead>
                                </div>
                            );
                        })
                    }
                </table>  
                <button onClick={this.addRow.bind(this)}>
                    Add Method
                </button>       
            </div>

        );
    }
}
