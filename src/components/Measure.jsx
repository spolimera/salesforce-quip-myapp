import Styles from "./Measure.less";

export default class Measure extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        measures: props.measures
      };
      this.type_values = [{ label: "In Progress", value: "in_progress" },
                          { label: "Completion", value: "completion" }];
      this.status_values = [{ label: "In Progress", value: "in_progress" },
                          { label: "Completion", value: "completion" }];                    
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
                      <td className={Styles.tableCell}>
                        <select value={measure.get("type")} onChange={(e) => { this.onChange(e.target.value, measure, "type") }}>
                            <option>
                              --select--
                            </option>
                          {this.type_values.map((type) => {
                            return <option value={type.value}>
                                      {type.label}
                                   </option>
                          })}
                        </select>
                      </td>

                      <td className={Styles.tableCell}>
                        <input type="text" value={measure.get("name")} 
                        onChange={(e) => { this.onChange(e.target.value, measure, "name") }}
                        className={Styles.tableCell}/>
                      </td>

                      <td className={Styles.tableCell}>
                        <select value={measure.get("status")} onChange={(e) => { this.onChange(e.target.value, measure, "status") }}>
                            <option>
                                  --select--
                            </option>
                          {this.status_values.map((status) => {
                            return <option value={status.value}>
                                      {status.label}
                                   </option>
                          })}
                        </select>
                      </td>

                      <td className={Styles.tableCell}>
                        <input type="number" value={measure.get("initial_value")} 
                        onChange={(e) => { this.onChange(parseInt(e.target.value), measure, "initial_value") }}
                        className={Styles.tableCell}/>
                      </td>

                      <td className={Styles.tableCell}>
                        <input type="number" value={measure.get("current_value")} 
                        onChange={(e) => { this.onChange(parseInt(e.target.value), measure, "current_value") }}
                        className={Styles.tableCell}/>
                      </td>

                      <td className={Styles.tableCell}>
                        <input type="number" value={measure.get("target_value")} 
                         onChange={(e) => { this.onChange(parseInt(e.target.value), measure, "target_value") }}
                        className={Styles.tableCell}/>
                      </td>

                      <td className={Styles.tableCell}>
                       <input type="date" value={measure.get("due_date")} 
                        onChange={(e) => { this.onChange(e.target.value, measure, "due_date") }}
                       className={Styles.tableCell}/>
                      </td>
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

    onChange(value, measure, id) {
      console.log(value);
      measure.set(id, value);
      console.log(measure.get(id));
    }
}
