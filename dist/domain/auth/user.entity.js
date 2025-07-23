"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["DOCTOR"] = "DOCTOR";
    UserRole["NURSE"] = "NURSE";
    UserRole["RECEPTIONIST"] = "RECEPTIONIST";
})(UserRole || (exports.UserRole = UserRole = {}));
class User {
    userId;
    username;
    email;
    password;
    role;
    isActive;
    doctorId;
    createdAt;
    updatedAt;
    constructor(userId, username, email, password, role, isActive = true, doctorId = null, createdAt = null, updatedAt = null) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isActive = isActive;
        this.doctorId = doctorId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map