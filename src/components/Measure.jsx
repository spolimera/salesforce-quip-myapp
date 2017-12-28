import Styles from "./Measure.less";

export default class Measure extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        measures: props.measures
      };
    }

    handleClick = (e, measure) => {
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
          { measure, callback: this.deleteRow.bind(this)},
        );
    }

    addRow(){
      let measures = this.getMeasures();
      measures.add({});

      this.setState({
          measures: measures
      });
    }

    deleteRow() {
        let measures = this.getMeasures();
        this.setState({
            measures
        });
    }

    render() {
        let measures = this.state.measures;
        let rootRecord = quip.apps.getRootRecord();

        return (
          <div>
            <table className={Styles.measure}>
              <thead className={Styles.tableHead}>
                <tr>
                  <th className={Styles.tableHeadCell}>Type</th>
                  <th className={Styles.tableHeadCell}>Measure Name</th>
                  <th className={Styles.tableHeadCell}>Status</th>
                  <th className={Styles.tableHeadCell}>Initial Value</th>
                  <th className={Styles.tableHeadCell}>Current Value</th>
                  <th className={Styles.tableHeadCell}>Target Value</th>
                  <th className={Styles.tableHeadCell}>Due Date</th>
                </tr>
              </thead>
              {
                measures && measures.getRecords().map((measure) => {
                  return (
                    <tr className={Styles.tableRow}>
                      <td className={Styles.tableCell}>{measure.get("type")}</td>
                      <td className={Styles.tableCell}>{measure.get("name")}</td>
                      <td className={Styles.tableCell}>{measure.get("status")}</td>
                      <td className={Styles.tableCell}>{measure.get("initial_value")}</td>
                      <td className={Styles.tableCell}>{measure.get("current_value")}</td>
                      <td className={Styles.tableCell}>{measure.get("target_value")}</td>
                      <td className={Styles.tableCell}>{measure.get("due_date")}</td>
                    </tr>
                  );
                })
              }
            </table>
          </div>
        );
    }

    displayOption(list) {
      return(
        <select>
          {
            list.map((l) => {
              return <option>{l}</option>
            })
          }
        </select>
      );
    }

    saveToSalesforce(v2mobId) {
      let client = quip.apps.getRootRecord().getClient();
      let methods = this.getMethods().getRecords();

      methods.forEach((method) => {
        let body = {
          "fields": {
            "play2win__Text__c": method.get("title").getTextContent(),
            "play2win__Description__c": method.get("description").getTextContent(),
            "play2win__V2MOB__c": v2mobId
          }
        }

        if(!method.get("id")) {
          body["apiName"] = "play2win__Methods__c";
          client.createRecord(body).then((response) => {
            method.set("id", response.id);
          });
        } else {
          client.updateRecord(method.get("id"), body).then((response) => {
          });
        }
      });
    }
}
