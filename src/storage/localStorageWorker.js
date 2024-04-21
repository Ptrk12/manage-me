"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localStorageWorker = void 0;
var localStorageWorker = /** @class */ (function () {
    function localStorageWorker() {
    }
    localStorageWorker.add = function (key, item) {
        localStorage.setItem(key, JSON.stringify(item));
    };
    localStorageWorker.getById = function (key) {
        if (key != undefined) {
            var item = localStorage.getItem(key);
            if (item) {
                try {
                    var project = JSON.parse(item);
                    return project;
                }
                catch (error) {
                    console.error("Error parsing project from localStorage:", error);
                    return null;
                }
            }
            return null;
        }
    };
    localStorageWorker.delete = function (key) {
        localStorage.removeItem(key);
    };
    localStorageWorker.getAllItems = function () {
        var list = new Array();
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key != null) {
                var value = localStorage.getItem(key);
                if (value != null) {
                    var item = JSON.parse(value);
                    list.push(item);
                }
            }
        }
        return list;
    };
    return localStorageWorker;
}());
exports.localStorageWorker = localStorageWorker;
