import quip from "quip";

class CommentRichText extends quip.apps.RichTextRecord {
    static getProperties() {
        return {};
    }

    initialize() {
        this.listener = this.listen(this.notifyParent);
        this.listenToContent(this.validateTextSize.bind(this));
        this.listenToComments(this.notifyParent);
    }

    getDom() {
        return this.node;
    }

    setDom(node) {
        this.node = node;
    }

    supportsComments() {
        return true;
    }

    validateTextSize(aa) {
        console.log("*** ", JSON.stringify(aa.getTextContent()));
        let text = this.getTextContent();
        if(text.length > 20) {
            this.replaceContent(text.slice(0,19));
        }
    }

    setCallback(_callback) {
        this._callback = _callback;
    }

    notifyParent = (dd) => {
        this.getParentRecord().notifyListeners();
        this._callback && this._callback();
    };
}

class Measure extends quip.apps.Record {
    static getProperties = () => ({
        type: "string",
        name: "string",
        status: "string",
        initial_value: "number",
        current_value: "number",
        target_value: "number",
        due_date: "string"
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

class Method extends quip.apps.Record {
    static getProperties = () => ({
        title: CommentRichText,
        description: CommentRichText,
        id: "string",
        measures: quip.apps.RecordList.Type(Measure),
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

class Obstacle extends quip.apps.Record {
    static getProperties = () => ({
        name: CommentRichText,
        description: CommentRichText,
        id: "string"
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

class RootRecord extends quip.apps.RootRecord {
    static getProperties = () => ({
        obstacles: quip.apps.RecordList.Type(Obstacle),
        methods: quip.apps.RecordList.Type(Method),
        vision: CommentRichText,
        values: CommentRichText,
        id: "string"
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

    setClient(client) {
        this.salesforceClient_ = client;
    }

    getClient() {
        return this.salesforceClient_;
    }
}

export default () => {
    quip.apps.registerClass(Measure, "measure");
    quip.apps.registerClass(CommentRichText, "commentrichtext");
    quip.apps.registerClass(Method, "method");
    quip.apps.registerClass(Obstacle, "obstacle");
    quip.apps.registerClass(RootRecord, "root");
}

