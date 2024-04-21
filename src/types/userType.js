"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserRoles_1 = require("../enums/UserRoles");
var userType = /** @class */ (function () {
    function userType(username, surname, password) {
        this.id = userType.nextId++;
        this.username = username;
        this.surname = surname;
        this.password = password;
        this.role = UserRoles_1.default.Developer;
    }
    userType.nextId = 1;
    return userType;
}());
exports.default = userType;
