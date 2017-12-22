import quip from "quip";

class CommentRichText extends quip.apps.RichTextRecord {
    static getProperties() {
        return {};
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
}

class Method extends quip.apps.Record {
    static getProperties = () => ({
        title: CommentRichText,
        description: CommentRichText
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
        vision: quip.apps.RecordList.Type(CommentRichText),
        values: quip.apps.RecordList.Type(CommentRichText),
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

export default () => {
    quip.apps.registerClass(CommentRichText, "commentrichtext");
    quip.apps.registerClass(Method, "method");
    quip.apps.registerClass(Obstacle, "obstacle");
    quip.apps.registerClass(RootRecord, "root");
}
