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
                 <button onClick={this.deleteRow.bind(this)}>
                    Delete Row
                  </button>
              </div>
              Hello
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
                                         key={cards.getId()}
                                         record={card.get("name")}
                                         color={"BLUE"}
                                         width={200}
                                         minHeight={50}
                                         maxHeight={280}
                                         align={"center" }  
                                        />
                                    </td>

                                    <td>
                                        <quip.apps.ui.RichTextBox
                                         key={cards.getId()}
                                         record={card.get("description")}
                                         color={"BLUE"}
                                         width={200}
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

    deleteRow() {
        let cards = this.getCards();
        cards.remove(cards.getRecords()[cards.getRecords().length - 1]);

        this.setState({
            cards: cards
        });
    }

    getCards() {
        let cards = quip.apps.getRootRecord().get("cards");
        return cards;
    }
}
