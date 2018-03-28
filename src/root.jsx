import quip from "quip";
import App from "./App.jsx";
import { SalesforceClient } from "./components/client.js";
import registerModels from "./model";

registerModels();

quip.apps.initialize({
    initializationCallback: (root, params) => {
        const rootRecord = quip.apps.getRootRecord();
        let auth = quip.apps.auth("salesforce");
        let client = new SalesforceClient(auth);

        rootRecord.setClient(client);

        if (params.isCreation) {
            rootRecord.set("obstacles", [{
                  name: {},
                  description: {}, 
                }, {
                  name: {},
                  description: {}, 
                }]);

            rootRecord.set("methods", [{
                  title: { },
                  description: { },
                  measures: [{}],
                }]);
            
            rootRecord.set("vision", {});

            rootRecord.set("values", {});
        }    

        ReactDOM.render(<App/>, root);
    },
    menuCommands: [
        {
            id: "deleteItem",
            label: "Delete Row",
            handler: (name, payload) => {
                deleteRecord(payload.card);
                payload.card.delete();
                payload.callback();
            },
        },
        {
            id: "deleteMethod",
            label: "Delete Method",
            handler: (name, payload) => {
                deleteRecord(payload.method);
                payload.method.delete();
                payload.callback();
            },
        },
        {
            id: "addMeasure",
            label: "Add Measure",
            handler: (name, payload) => {
                payload.callback(name);
            },
        },
        {
            id: "deleteMeasure",
            label: "Delete Measure",
            handler: (name, payload) => { console.log(payload);
                let measure = payload.measure;
                console.log(measure);
                measure && deleteRecord(payload.measure);
                measure && payload.measure.delete();
                payload.callback(name);
            },
        },
    ],
    });

    function deleteRecord(record) {
        let client = quip.apps.getRootRecord().getClient();
        client.deleteRecord(record.get("id"));
    }