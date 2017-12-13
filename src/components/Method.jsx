import Styles from "./Method.less";

export default class Method extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        methods: this.getMethods()
      };
    }

    render() {
        let methods = this.state.methods;
        let rootRecord = quip.apps.getRootRecord();

        return (
            <div>

              <div>
                METHODS 
                <button onClick={this.addRow.bind(this)}>
                    AddRow
                </button>
              
              </div>

              <div ref={(c) => rootRecord.setDom(c)}>
                <quip.apps.ui.CommentsTrigger
                    record={rootRecord}
                    showEmpty={true}
                />
              </div>

              <table className={Styles.methodContainer}>
                
                   {   
                   		methods && methods.getRecords().map((method) => {
                            return(
                            	<div className={Styles.eachMethod}>
                                <tr className={Styles.tableRow}>
                                    <td>
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
                                	<td>
                                		Method Description
                                	</td>
                                    <td className={Styles.tableCell}>
                                        <quip.apps.ui.RichTextBox
                                         key={method.getId()}
                                         record={method.get("description")}
                                         color={"BLUE"}
                                         width={200}
                                         minHeight={50}
                                         maxHeight={280}
                                         align={"center" }  
                                        />
                                    </td>
                                </tr>
                                <span 
	                              className={Styles.showContextMenu}
	                              onClick={(e) => this.handleClick(e, method)}
	                              >
	                            </span>
                              	<div ref={(c) => method.setDom(c)}>
                                 <quip.apps.ui.CommentsTrigger
                                   record={method}
                                   showEmpty={true}
                                  />
                              	</div>
                            </div>
                            );

                        })
                    }
                </table>         
            </div>
            
        );
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
            title: {},
            description: {},
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
}
