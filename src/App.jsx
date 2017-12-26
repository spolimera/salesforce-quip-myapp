import Method from "./components/Method.jsx";
import Obstacle from "./components/Obstacle.jsx";
import Vision from "./components/Vision.jsx";
import Values from "./components/Values.jsx";

export default class App extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div>
          <button onClick={this.pushToSalesforce.bind(this)}>
            Push to Salesforce
          </button>

          <Vision/>
          <Values/>
          <Method ref={(ele) => this.method = ele}/>
          <Obstacle ref={(ele) => this.obstacle = ele}/>
        </div>
      );
    }

    pushToSalesforce() {
      let rootRecord = quip.apps.getRootRecord();
      let client = rootRecord.getClient();

      let vision = rootRecord.get("vision").getTextContent();
      let values = rootRecord.get("values").getTextContent();
      let id = rootRecord.get("id");

      let body = {
        "fields": {
            "play2win__Vision__c": vision,
            "play2win__Values__c": values
          }
      };

      if(!id) {
        body["apiName"] = "play2win__V2MOB__c";
        client.createRecord(body).then((response) => {
          rootRecord.set("id", response.id);
        });
      } else {
        client.updateRecord(rootRecord.get("id"), body).then((response) => {
        });
      }

      this.method.saveToSalesforce(id);
      this.obstacle.saveToSalesforce(id);
    }
}
