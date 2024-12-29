const apiCo = {
    Auth: process.env.REACT_APP_APICO_AUTH,
    BaseURL: process.env.REACT_APP_APICO_BASE_URL,
    Integration: process.env.REACT_APP_APICO_INTEGRATION,
};

class SpreadsheetService {
    constructor() {
        this.baseUrl = `${apiCo.BaseURL}/${apiCo.Integration}`;
        this.headers = {
            Authorization: apiCo.Auth,
            "Content-Type": "application/json",
        };
    }

    async getSpreadsheet(spreadsheetId) {
        const response = await fetch(`${this.baseUrl}/${spreadsheetId}`, {
            method: "GET",
            headers: this.headers,
        });
        return response.json();
    }

    async getSpreadsheetValues(spreadsheetId, range) {
        const response = await fetch(`${this.baseUrl}/${spreadsheetId}/values/${range}`, {
            method: "GET",
            headers: this.headers,
        });
        return response.json();
    }

    async batchGetSpreadsheetValues(spreadsheetId, ranges) {
        const response = await fetch(
            `${this.baseUrl}/${spreadsheetId}/values:batchGet?ranges=${ranges.join(",")}`,
            {
                method: "GET",
                headers: this.headers,
            }
        );
        return response.json();
    }

    async updateSpreadsheetValues(spreadsheetId, range, values) {
        const response = await fetch(
            `${this.baseUrl}/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`,
            {
                method: "PUT",
                headers: this.headers,
                body: JSON.stringify({ values }),
            }
        );
        return response.json();
    }

    async batchUpdateSpreadsheetValues(spreadsheetId, data) {
        const response = await fetch(`${this.baseUrl}/${spreadsheetId}/values:batchUpdate`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data),
        });
        return response.json();
    }

    async appendValues(spreadsheetId, range, values) {
        const response = await fetch(
            `${this.baseUrl}/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
            {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({ values }),
            }
        );
        return response.json();
    }

    async batchUpdateSpreadsheet(spreadsheetId, data) {
        const response = await fetch(`${this.baseUrl}/${spreadsheetId}:batchUpdate`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data),
        });
        return response.json();
    }

    async createSpreadsheet(data) {
        const response = await fetch(this.baseUrl, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data),
        });
        return response.json();
    }

    async deleteRows(spreadsheetId, range) {
        const response = await fetch(`${this.baseUrl}/${spreadsheetId}/values/${range}:clear`, {
            method: "POST",
            headers: this.headers,
        });
        return response.json();
    }

    async getFilteredSheets(spreadsheetId, range, filters) {
        const response = await this.getSpreadsheetValues(spreadsheetId, range);
        const values = response.values || [];
        return values.filter((sheet) => {
            return filters.every(([index, value]) => sheet[index] === value);
        });
    }

    async autoResizeColumns(spreadsheetId, sheetId, startColumnIndex, endColumnIndex) {
        const response = await fetch(`${this.baseUrl}/${spreadsheetId}:batchUpdate`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                requests: [
                    {
                        autoResizeDimensions: {
                            dimensions: {
                                sheetId: sheetId,
                                dimension: "COLUMNS",
                                startIndex: startColumnIndex,
                                endIndex: endColumnIndex,
                            },
                        },
                    },
                ],
            }),
        });
        return response.json();
    }

    async getSheetId(spreadsheetId, sheetName) {
        const spreadsheet = await this.getSpreadsheet(spreadsheetId);
        const sheet = spreadsheet.sheets.find((sheet) => sheet.properties.title === sheetName);
        return sheet ? sheet.properties.sheetId : null;
    }

    openSpreadsheetInNewTab(spreadsheetId) {
        const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
        window.open(url, "_blank");
    }
}

export default SpreadsheetService;
