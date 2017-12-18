import quip from "quip";
import App from "./App.jsx";
import { SalesforceClient } from "./components/client.js";

class Method extends quip.apps.Record {
    static getProperties = () => ({
        title: quip.apps.RichTextRecord,
        description: quip.apps.RichTextRecord,
    })

    getDom() {
        return this.node;
    }

    setDom(node) {
        this.node = node;
    }

    supportsComments() {
        return true;
    }
}

quip.apps.registerClass(Method, "method");

class Obstacle extends quip.apps.Record {
    static getProperties = () => ({
        name: quip.apps.RichTextRecord,
        description: quip.apps.RichTextRecord,
    })

    getDom() {
        return this.node;
    }

    setDom(node) {
        this.node = node;
    }

    supportsComments() {
        return true;
    }
}

quip.apps.registerClass(Obstacle, "obstacle");

class RootRecord extends quip.apps.RootRecord {
    static getProperties = () => ({
        obstacles: quip.apps.RecordList.Type(Obstacle),
        methods: quip.apps.RecordList.Type(Method)
    })

    static getDefaultProperties = () => ({
        obstacles: [],
    })

    getDom() {
        return this.node;
    }

    setDom(node) {
        this.node = node;
    }

    supportsComments() {
        return true;
    }
}

quip.apps.registerClass(RootRecord, "root");

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
                  title: {},
                  description: {}, 
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