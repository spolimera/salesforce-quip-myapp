import Styles from "./Measure.less";
import Chevron from "quip-apps-chevron";
import cx from "classnames";

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
              "addMeasure", // add measure
              "deleteMeasure", // id from menuCommand in Initialization,
              quip.apps.DocumentMenuCommands.SEPARATOR,
              quip.apps.DocumentMenuCommands.DELETE_APP,
          ],
          [], // No highlighted commands
          disabledCommands, // Disabled commands based on state
          () => {},
          { measure, callback: this.handleCallback.bind(this)},
        );
    }

    handleCallback(id) {
      if(id === "addMeasure") {
        this.addRow();
      } else if(id === "deleteMeasure") {
        this.deleteRow();
      }
    }

    addRow(){
      let measures = this.props.measures;
      measures.add({});

      this.setState({
          measures: measures
      });
    }

    deleteRow() {
        let measures = this.props.measures;
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

                      <td className={cx(Styles.tableCell, (measure.get("type") === "completion" && Styles.disabled))}>
                        <input type="text" value={measure.get("name")} 
                        onChange={(e) => { this.onChange(e.target.value, measure, "name") }}
                        className={Styles.tableCell}/>
                      </td>

                      <td className={cx(Styles.tableCell, measure.get("type") === "in_progress" && Styles.disabled)}>
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

                      <td className={cx(Styles.tableCell, measure.get("type") === "completion" && Styles.disabled)}>
                        <input type="number" value={measure.get("initial_value")} 
                        onChange={(e) => { this.onChange(parseInt(e.target.value), measure, "initial_value") }}
                        className={Styles.tableCell}/>
                      </td>

                      <td className={cx(Styles.tableCell, measure.get("type") === "completion" && Styles.disabled)}>
                        <input type="number" value={measure.get("current_value")} 
                        onChange={(e) => { this.onChange(parseInt(e.target.value), measure, "current_value") }}
                        className={Styles.tableCell}/>
                      </td>

                      <td className={cx(Styles.tableCell, measure.get("type") === "completion" && Styles.disabled)}>
                        <input type="number" value={measure.get("target_value")} 
                         onChange={(e) => { this.onChange(parseInt(e.target.value), measure, "target_value") }}
                        className={Styles.tableCell}/>
                      </td>

                      <td className={cx(Styles.tableCell, measure.get("type") === "completion" && Styles.disabled)}>
                       <input type="date" value={measure.get("due_date")} 
                        onChange={(e) => { this.onChange(e.target.value, measure, "due_date") }}
                       className={Styles.tableCell}/>
                      </td>

                      <td>
                        <span
                        className={Styles.chevron}
                        onClick={(e) => this.handleClick(e, measure)}
                        style={{ float: "left" }}
                        >
                        <Chevron
                            color={
                                measure
                                    ? quip.apps.ui.ColorMap.BLUE.VALUE
                                : quip.apps.ui.ColorMap[color].VALUE
                            }
                            />
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
      measure.set(id, value);
      this.setState({});
    }
}
