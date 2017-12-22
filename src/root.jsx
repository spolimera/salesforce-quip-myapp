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
                }]);
            console.log("##3 ", rootRecord);
            rootRecord.set("vision", [{
                }]);

            rootRecord.set("values", [{
                }]);
        }    

        ReactDOM.render(<App/>, root);
    },
    menuCommands: [
        {
            id: "deleteItem",
            label: "Delete Row",
            handler: (name, payload) => {
                payload.card.delete();
                payload.callback();
            },
        },
        {
            id: "deleteMethod",
            label: "Delete Method",
            handler: (name, payload) => {
                payload.method.delete();
                payload.callback();
            },
        },
    ],
    });