import quip from "quip";
import App from "./App.jsx";

class Row extends quip.apps.Record {
    static getProperties = () => ({
        name: quip.apps.RichTextRecord,
        description: quip.apps.RichTextRecord,
    })
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
}

quip.apps.registerClass(RootRecord, "root");

quip.apps.initialize({
    initializationCallback: (root, params) => {
        const rootRecord = quip.apps.getRootRecord();
        rootRecord.set("cards", [{
                  name: {},
                  description: {}, 
                }]);
        
            ReactDOM.render(<App/>, root);
        }
    });