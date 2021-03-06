import Styles from "./Obstacle.less";
import cx from "classnames";
import Chevron from "quip-apps-chevron";

export default class Obstacle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cards: this.getCards()
      };
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
                name: {
                    RichText_placeholderText:"Add Obstacle Title",
                },
                description: {
                    RichText_placeholderText:"Add Obstacle Description",
                },
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
            let cards = quip.apps.getRootRecord().get("obstacles");
            return cards;
        }

    render() {
        let cards = this.state.cards;
        return (
            <div className={Styles.obstacle}>

                <div className={Styles.title}>
                    OBSTACLES
                </div>

                 <table className={Styles.table}>
                    
                   <thead>
                        <tr className={Styles.tableRow}>
                        <td className={Styles.tableColumn} style={{ width: "20%" }}>
                            Obstacle Title
                        </td>

                        <td className={Styles.tableColumn}>
                            Obstacle Description
                        </td>
                        </tr>
                   </thead>
                     
                   {   cards && cards.getRecords().map((card) => {
                            return(
                                <tr className={Styles.tableRow}>
                                    <td className={Styles.tableColumn}>
                                        <div style={{ float: "left" }}>
                                            <quip.apps.ui.RichTextBox
                                             key={card.getId()}
                                             record={card.get("name")}
                                             color={"BLUE"}
                                             width={140}
                                             minHeight={50}
                                             maxHeight={280}
                                             align={"center" }  
                                            />
                                        </div>
                                        <span ref={(c) => card.get("name").setDom(c)} style={{ float: "left" }} 
                                        className={cx(Styles.commentsTrigger, {
                                            [Styles.commented]:
                                            card.get("name").getCommentCount() > 0,
                                            })}>
                                            <quip.apps.ui.CommentsTrigger
                                                record={card.get("name")}
                                                showEmpty={true}
                                            />
                                        </span>
                                    </td>

                                    <td className={Styles.tableColumn}>
                                        <div style={{ float: "left" }}>
                                        <quip.apps.ui.RichTextBox
                                         key={card.getId()}
                                         record={card.get("description")}
                                         color={"BLUE"}
                                         width={660}
                                         minHeight={50}
                                         maxHeight={280}
                                         align={"center" }  
                                        />
                                        </div>

                                    <span 
                                        className={Styles.chevron}
                                        onClick={(e) => this.handleClick(e, card)}
                                        style={{ float: "left" }}
                                        >
                                        <Chevron
                                            color={
                                                card
                                                    ? quip.apps.ui.ColorMap.BLUE.VALUE
                                                : quip.apps.ui.ColorMap[color].VALUE
                                            }
                                            />
                                    </span>

                                      <span ref={(c) => card.get("description").setDom(c)}
                                        className={cx(Styles.commentsTrigger, {
                                                [Styles.commented]:
                                                card.get("description").getCommentCount() > 0,
                                            })}
                                        style={{ float: "left" }}
                                        >
                                        <quip.apps.ui.CommentsTrigger
                                            record={card.get("description")}
                                            showEmpty={true}
                                        />
                                      </span>
                                    </td>
                                    
                                </tr>
                            );

                        })
                    }
                </table>   

                <button onClick={this.addRow.bind(this)} style={{margin:"5px", width: "15%"}}>
                    Add Obstacle
                </button>       
            </div>

        );
    }

    saveToSalesforce(v2mobId) {
      let client = quip.apps.getRootRecord().getClient();
      let cards = this.getCards().getRecords();

      cards.forEach((card) => {
        let body = {
          "fields": {
            "play2win__Title__c": card.get("name").getTextContent(),
            "play2win__Description__c": card.get("description").getTextContent(),
            "play2win__V2MOB__c": v2mobId
          }
        }

        if(!card.get("id")) {
          body["apiName"] = "play2win__Obsacles__c";
          client.createRecord(body).then((response) => {
            card.set("id", response.id);
          });
        } else {
          client.updateRecord(card.get("id"), body).then((response) => {
          });
        }
      });
    }
}