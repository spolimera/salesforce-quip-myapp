import Styles from "./App.less";

export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        rowCount: 0,
        cards: this.getCards()
      };
    }

    render() {
        let cards = this.state.cards;

        return (
            
            <div>

              <div>
                Obstacle 
                <button onClick={this.addRow.bind(this)}>
                    AddRow
                </button>
              
              </div>

              <table className={Styles.table}>
                    
                   <thead>
                        <tr className={Styles.tableRow}>
                        <td className={Styles.tableColumn}>Name</td>
                        <td className={Styles.tableColumn}>Description</td>
                        </tr>
                   </thead>
                     
                   {   cards && cards.getRecords().map((card) => {
                            return(
                                <tr className={Styles.tableRow}>
                                    <td style={{ border: "solid 1px black"}}>
                                        <quip.apps.ui.RichTextBox
                                         key={card.getId()}
                                         record={card.get("name")}
                                         color={"BLUE"}
                                         width={200}
                                         minHeight={50}
                                         maxHeight={280}
                                         align={"center" }  
                                        />
                                    </td>

                                    <td>
                                        <div style={{ float: "left" }}>
                                        <quip.apps.ui.RichTextBox
                                         key={card.getId()}
                                         record={card.get("description")}
                                         color={"BLUE"}
                                         width={200}
                                         minHeight={50}
                                         maxHeight={280}
                                         align={"center" }  
                                        />
                                        </div>
                                        <span 
                                            className={Styles.showContextMenu}
                                            onClick={(e) => this.handleClick(e, card)}
                                            >
                                        </span>
                                    </td>
                                </tr>
                            );

                        }) 
                    }
                    
                
                </table>         
            </div>
            
        );
    }

    handleClick = (e, card) => {
        const { canAdd, canDelete } = this.state;
        const disabledCommands = [];

        quip.apps.showContextMenu(
            e,
            [
                "deleteItem", // id from menuCommand in Initialization,
                quip.apps.DocumentMenuCommands.SEPARATOR,
                quip.apps.DocumentMenuCommands.DELETE_APP,
            ],
            [], // No highlighted commands
            disabledCommands, // Disabled commands based on state
            () => {},
            { card, callback: this.deleteRow.bind(this)},
        );
    }

    addRow(){
        let cards = this.getCards();
        cards.add({
            name: {},
            description: {},
        });

        this.setState({
            cards: cards
        });
    }

    deleteRow(card) {
        let cards = this.getCards();
        this.setState({
            cards
        });
    }

    getCards() {
        let cards = quip.apps.getRootRecord().get("cards");
        return cards;
    }
}
