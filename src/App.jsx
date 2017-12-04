import Styles from "./App.less";

export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        rowCount: 0,
        cards: quip.app.getRootRecord().get("cards")
      };
    }

    render() {
        let { cards } = this.state;
        
        return (
            
            <div>

             <div>
                Obstacle 
                 <button onClick={this.addRow.bind(this)}>
                    AddRow
                  </button>
              </div>
              Hello
              <table className={Styles.table}>
                    
                   <thead>
                        <tr>
                        <td colspan = "4">Name</td>
                        <td colspan = "4">Description</td>
                        </tr>
                   </thead>
                     
                   {   cards.getRecords().map((card) => {
                            return(
                                <tr>
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
         
    }
}
