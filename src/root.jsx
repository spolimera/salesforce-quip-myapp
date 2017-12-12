import quip from "quip";
import App from "./App.jsx";

class Row extends quip.apps.Record {
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

quip.apps.registerClass(Row, "table-row");

class RootRecord extends quip.apps.RootRecord {
    static getProperties = () => ({
        title: quip.apps.RichTextRecord,
        cards: quip.apps.RecordList.Type(Row),
    })

    static getDefaultProperties = () => ({
        cards: [],
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
        
        if (params.isCreation) {
            rootRecord.set("cards", [{
                  name: {},
                  description: {}, 
                }, {
                  name: {},
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
    ],
    });