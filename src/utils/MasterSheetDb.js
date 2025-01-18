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

    async getUser(email, value) {
        await this.loadSpreadsheets();
        const usersSpreadsheet = await this.getFilteredSpreadsheets([[1, "Users"]]);
        const users = await this.spreadsheetService.getFilteredRows(
            usersSpreadsheet[0][4],
            "Users",
            [[4, email]]
        );
        return users.length > 0 ? users[0] : null;
    }

    async createUser(username, firstName, lastName, email, preferredColor, password) {
        await this.loadSpreadsheets();
        const usersSpreadsheet = await this.getFilteredSpreadsheets([[1, "Users"]]);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            throw new Error(
                "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one number"
            );
        }

        const existingUser = await this.getUser(email);
        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        const dateJoined = new Date().toISOString();
        const dateActive = new Date().toISOString();
        const newUser = [
            username,
            "Users",
            firstName,
            lastName,
            email,
            preferredColor,
            dateJoined,
            dateActive,
            password,
        ];

        await this.spreadsheetService.appendValues(usersSpreadsheet[0][4], "Users", [newUser]);

        return newUser;
    }

    async updateUser(email, updatedDetails) {
        await this.loadSpreadsheets();
        const usersSpreadsheet = await this.getFilteredSpreadsheets([[1, "Users"]]);
        const users = await this.spreadsheetService.getSpreadsheetValues(
            usersSpreadsheet[0][4],
            "Users"
        );

        if (users.values) {
            const userIndex = users.values.findIndex((user) => user[4] === email);
            if (userIndex !== -1) {
                const user = users.values[userIndex];
                user[0] = updatedDetails.username || user[0];
                user[2] = updatedDetails.firstName || user[2];
                user[3] = updatedDetails.lastName || user[3];
                user[9] = updatedDetails.profilePhoto || user[9];

                await this.spreadsheetService.updateSpreadsheetValues(
                    usersSpreadsheet[0][4],
                    `Users!A${userIndex + 1}:J${userIndex + 1}`,
                    [user]
                );

                return user;
            } else {
                throw new Error("User not found");
            }
        } else {
            throw new Error("Failed to load users");
        }
    }
}

export default MasterSheetDb;
