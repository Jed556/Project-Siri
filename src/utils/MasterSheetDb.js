import { utils, writeFile } from "xlsx";
import SpreadsheetService from "utils/SpreadsheetService";

const apiCo = {
    MasterSpreadsheetId: process.env.REACT_APP_APICO_MASTER_SPREADSHEET_ID,
};

class MasterSheetDb {
    constructor() {
        this.spreadsheets = [];
        this.spreadsheetService = new SpreadsheetService();
        this.loadSpreadsheets();
    }

    async loadSpreadsheets() {
        try {
            const data = await this.spreadsheetService.getSpreadsheetValues(
                apiCo.MasterSpreadsheetId,
                "MasterSheet"
            );
            this.spreadsheets = data.values || [];
        } catch (err) {
            console.error("Failed to load spreadsheet:", err);
        }
    }

    async saveSpreadsheets() {
        try {
            await this.spreadsheetService.updateSpreadsheetValues(
                apiCo.MasterSpreadsheetId,
                "MasterSheet",
                this.spreadsheets
            );
            await this.autoResizeColumns();
        } catch (err) {
            console.error("Failed to save sheets:", err);
        }
    }

    async autoResizeColumns() {
        try {
            const spreadsheetId = await this.spreadsheetService.getSheetId(
                apiCo.MasterSpreadsheetId,
                "MasterSheet"
            );
            const longestRow = this.spreadsheets.reduce((maxRow, currentRow) => {
                return currentRow.length > maxRow.length ? currentRow : maxRow;
            }, []);
            await this.spreadsheetService.autoResizeColumns(
                apiCo.MasterSpreadsheetId,
                spreadsheetId,
                0,
                longestRow.length
            );
        } catch (err) {
            console.error("Failed to auto-resize columns:", err);
        }
    }

    async appendSpreadsheet(name, type, dateCreated, creator, spreadsheetId, isTrashed = false) {
        await this.loadSpreadsheets();
        this.spreadsheets.push([name, type, dateCreated, creator, spreadsheetId, isTrashed]);
        await this.saveSpreadsheets();
    }

    async openSpreadsheetUrl(spreadsheetId) {
        await this.loadSpreadsheets();
        const spreadsheet = this.spreadsheets.find(
            (spreadsheet) => spreadsheet[4] === spreadsheetId
        );
        if (spreadsheet) {
            const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
            window.open(url, "_blank");
        } else {
            console.error("Spreadsheet not found");
        }
    }

    async markSpreadsheetAsTrashed(spreadsheetId) {
        await this.loadSpreadsheets();
        const spreadsheet = this.spreadsheets.find(
            (spreadsheet) => spreadsheet[4] === spreadsheetId
        );
        if (spreadsheet) {
            spreadsheet[5] = true;
            await this.saveSpreadsheets();
        } else {
            console.error("Spreadsheet not found");
        }
    }

    async getAllUntrashedSpreadsheets() {
        await this.loadSpreadsheets();
        return this.spreadsheets.filter((spreadsheet) => !spreadsheet[5]);
    }

    async getTrashedSpreadsheets() {
        await this.loadSpreadsheets();
        return this.spreadsheets.filter((spreadsheet) => spreadsheet[5]);
    }

    async getFilteredSpreadsheets(filters) {
        await this.loadSpreadsheets();
        return this.spreadsheets.filter((spreadsheet) => {
            return filters.every(([index, value]) => spreadsheet[index] === value);
        });
    }

    exportToFile(filename = "MasterSheetDb.xlsx") {
        this.loadSpreadsheets();
        const worksheet = utils.aoa_to_sheet(this.spreadsheets);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "MasterSheetDb");
        writeFile(workbook, filename);
    }
}

export default MasterSheetDb;
