import { utils, writeFile } from "xlsx";
import SpreadsheetService from "utils/SpreadsheetService";

const apiCo = {
    MasterSheetId: process.env.REACT_APP_APICO_MASTER_SHEET_ID,
};

class MasterSheetDb {
    constructor() {
        this.sheets = [];
        this.spreadsheetService = new SpreadsheetService();
        this.loadSheets();
    }

    async loadSheets() {
        try {
            const data = await this.spreadsheetService.getSpreadsheetValues(
                apiCo.MasterSheetId,
                "MasterSheet"
            );
            this.sheets = data.values || [];
        } catch (err) {
            console.error("Failed to load sheets:", err);
        }
    }

    async saveSheets() {
        try {
            await this.spreadsheetService.updateSpreadsheetValues(
                apiCo.MasterSheetId,
                "MasterSheet",
                this.sheets
            );
            await this.autoResizeColumns();
        } catch (err) {
            console.error("Failed to save sheets:", err);
        }
    }

    async autoResizeColumns() {
        try {
            const sheetId = await this.spreadsheetService.getSheetId(
                apiCo.MasterSheetId,
                "MasterSheet"
            );
            const longestRow = this.sheets.reduce((maxRow, currentRow) => {
                return currentRow.length > maxRow.length ? currentRow : maxRow;
            }, []);
            await this.spreadsheetService.autoResizeColumns(
                apiCo.MasterSheetId,
                sheetId,
                0,
                longestRow.length
            );
        } catch (err) {
            console.error("Failed to auto-resize columns:", err);
        }
    }

    async appendSheetData(name, type, dateCreated, creator, sheetId, isTrashed = false) {
        this.sheets.push([name, type, dateCreated, creator, sheetId, isTrashed]);
        await this.saveSheets();
    }

    openSheetUrl(sheetId) {
        const sheet = this.sheets.find((sheet) => sheet[4] === sheetId);
        if (sheet) {
            const url = `https://docs.google.com/spreadsheets/d/${sheetId}`;
            window.open(url, "_blank");
        } else {
            console.error("Sheet not found");
        }
    }

    async markSheetAsTrashed(sheetId) {
        const sheet = this.sheets.find((sheet) => sheet[4] === sheetId);
        if (sheet) {
            sheet[5] = true;
            await this.saveSheets();
        } else {
            console.error("Sheet not found");
        }
    }

    getAllUntrashedSheets() {
        return this.sheets.filter((sheet) => !sheet[5]);
    }

    getTrashedSheets() {
        return this.sheets.filter((sheet) => sheet[5]);
    }

    getFilteredSheets(filters) {
        return this.sheets.filter((sheet) => {
            return filters.every(([index, value]) => sheet[index] === value);
        });
    }

    exportToFile(filename = "MasterSheetDb.xlsx") {
        const worksheet = utils.aoa_to_sheet(this.sheets);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "MasterSheetDb");
        writeFile(workbook, filename);
    }
}

export default MasterSheetDb;
