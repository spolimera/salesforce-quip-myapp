// Copyright 2017 Quip

import "whatwg-fetch";

const OBJECT_INFO_ENDPOINT = "ui-api/object-info";

const RECORDS_ENDPOINT = "ui-api/records";
const RECORDS_BATCH_ENDPOINT = "ui-api/records/batch";

const SOQL_ENDPOINT = "query";

const API_VERSION = "services/data/v41.0";

// Access toke for local development
const ACCESS_TOKEN = "";

const TIMEOUT = 15000;

export class SalesforceClient {
    constructor(auth) {
        if (auth) {
            this.auth_ = auth;
            this.instanceUrl_ = undefined;
            if (auth.getTokenResponseParam("instance_url")) {
                this.instanceUrl_ = auth
                    .getTokenResponseParam("instance_url")
                    .toLowerCase();
            }
        } else {
            this.instanceUrl_ = "http://localhost:8080";
        }
        this.apiUrl_ = `${this.instanceUrl_}/${API_VERSION}`;
    }

    setAPIEndpoints_() {
        this.instanceUrl_ = this.auth_
            .getTokenResponseParam("instance_url")
            .toLowerCase();
        this.apiUrl_ = `${this.instanceUrl_}/${API_VERSION}`;
    }

    logout(callback) {
        this.auth_.logout(callback);
    }

    getInstanceUrl() {
        return this.instanceUrl_;
    }

    getHostname() {
        if (this.instanceUrl_.includes("://")) {
            const segs = this.instanceUrl_.split("://");
            return segs[1];
        }
        return this.instanceUrl_;
    }

    salesforceUrl(instanceUrl, recordId) {
        if (!instanceUrl) {
            instanceUrl = this.instanceUrl_;
        }
        return `${instanceUrl}/one/one.app#/sObject/${recordId}/view`;
    }

    isLoggedIn() {
        if (this.auth_) {
            return this.auth_.isLoggedIn();
        } else {
            // For dev environment
            return true;
        }
    }

    login(onAuthenticated) {
        if (this.isLoggedIn()) {
            onAuthenticated();
        } else {
            this.auth_
                .login(
                    {
                        prompt: "login",
                    },
                    result => {
                        if (result) {
                            console.log("!!!! ", result);
                            this.setAPIEndpoints_();
                            onAuthenticated();
                        }
                    })
                .catch(error => {
                    if (error.error_code) {
                        quip.apps.openLink(
                            "https://quip.com/dev/liveapps/salesforce/config");
                    }
                });
        }
    }

    fetchListViews(recordType, fetchType = "recent") {
        if (fetchType) {
            let query;
            switch (fetchType) {
                case "recent":
                    query =
                        `SELECT name,id,developerName FROM ListView where sobjecttype` +
                        `=\'${recordType}\' AND LastViewedDate != NULL ORDER BY ` +
                        `LastViewedDate DESC limit 10`;
                    break;
                case "all":
                    query =
                        `SELECT name,id,developerName FROM ListView where sobjecttype` +
                        `=\'${recordType}\'`;
                    break;
                default:
                    break;
            }
            if (query) {
                return this.fetchSoqlQuery(query);
            }
        }
        return new Promise((resolve, reject) => {
            reject("The fetchType is not supported: ", fetchType);
        });
    }

    fetchApiLink(link) {
        const url = `${this.instanceUrl_}/${API_VERSION}/${link}`;
        return this.request("GET", url);
    }

    fetchPicklistOptions(recordType, recordTypeId, fieldName) {
        const url = `${this
            .apiUrl_}/${OBJECT_INFO_ENDPOINT}/${recordType}/picklist-values/${recordTypeId}/${fieldName}`;
        return this.request("GET", url);
    }

    fetchSoqlQuery(query) {
        const params = {q: query};
        const soqlUrl = `${this.apiUrl_}/${SOQL_ENDPOINT}/`;
        return this.request("GET", soqlUrl, params);
    }

    fetchObjectInfo(recordType) {
        const objectInfoUrl = `${this
            .apiUrl_}/${OBJECT_INFO_ENDPOINT}/${recordType}`;
        return this.request("GET", objectInfoUrl);
    }

    fetchRecord(recordId) {
        return this.fetchRecords([recordId]);
    }

    fetchRecords(recordIds) {
        const params = {layoutTypes: "Full"};
        const recordsUrl = `${this
            .apiUrl_}/${RECORDS_BATCH_ENDPOINT}/${recordIds.join(",")}`;
        return this.request("GET", recordsUrl, params);
    }

    fetchRelatedLists(recordType) {
        const url = `${this.apiUrl_}/sobjects/${recordType}/describe/layouts`;
        return this.request("GET", url);
    }

    toQueryString(params) {
        return Object.keys(params)
            .map(
                key =>
                    encodeURIComponent(key) +
                    "=" +
                    encodeURIComponent(params[key]))
            .join("&");
    }

    updateRecord(recordId, body = {}) {
        const url = `${this.apiUrl_}/${RECORDS_ENDPOINT}/${recordId}`;
        return this.request("PATCH", url, body);
    }

    createRecord(body = {}) {
        const url = `${this.apiUrl_}/${RECORDS_ENDPOINT}`;
        return this.request("POST", url, body);
    }   

    deleteRecord(recordId) {
        const url = `${this.apiUrl_}/${RECORDS_ENDPOINT}/${recordId}`;
        return this.request("DELETE", url);
    }

    request(fetchMethod, baseUrl, data = {}, tryRefreshToken = true) {
        const method = fetchMethod.trim().toUpperCase();
        let url = baseUrl;
        let body;
        if (method === "GET" || method === "HEAD") {
            const queryString = this.toQueryString(data);
            url = queryString ? baseUrl + "?" + queryString : baseUrl;
        } else {
            body = data;
        }

        const timeout = new Promise((resolve, reject) => {
            window.setTimeout(
                reject,
                TIMEOUT,
                new Error("Request timed out"));
        });
       
        let fetcher;
        if (!this.auth_) { console.log("####2 ");
            fetcher = fetch(url, {
                method: method,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${ACCESS_TOKEN}`,
                },
                body: JSON.stringify(body),
            }).then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            });
        } else { console.log("###3 ");
            if (!this.auth_.isLoggedIn()) {
                return new Promise((resolve, reject) => {
                    reject("Unauthorized access");
                });
            }
            
            fetcher = new Promise((resolve, reject) => {
                this.auth_.request(
                    {
                        url: url,
                        data: body,
                        method: method,
                    },
                    resolve);
            }).then(response => {
                if (response.status == 401 && tryRefreshToken) {
                    // refetch the endpoint after refresh
                    return this.refreshToken_().then(response =>
                        this.request(fetchMethod, baseUrl, data, false)
                    );
                } else if (response.status >= 400) {
                    let error;
                    switch (response.status) {
                        case 400:
                            error = "BAD_REQUEST_ERROR";
                            break;
                        case 401:
                            error = "Unauthorized";
                            break;
                        case 403:
                            error = "ForbiddenError";
                            break;
                        case 404:
                            error = "NotFoundError";
                            break;
                        case 500:
                            error = "InternalServerError";
                            break;
                        case 503:
                            error = "ServiceUnavailableError";
                            break;
                        default:
                            error = "DEFAULT_ERROR";
                            break;
                    }
                    return Promise.reject(error);
                } else {
                    return response.json();
                }
            });
        }
        return Promise.race([timeout, fetcher]);
    }

    refreshToken_() {
        return new Promise((resolve, reject) => {
            this.auth_.refreshToken(response => {
                if (response && response.status >= 400) {
                    reject(response);
                } else {
                    resolve(response);
                }
            });
        });
    }
}
