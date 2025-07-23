"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalOrderModule = void 0;
const common_1 = require("@nestjs/common");
const medical_order_controller_1 = require("../../interface/medical-order/medical-order.controller");
const medical_order_service_1 = require("../../application/medical-order/medical-order.service");
const prisma_medical_order_repository_1 = require("./prisma-medical-order.repository");
let MedicalOrderModule = class MedicalOrderModule {
};
exports.MedicalOrderModule = MedicalOrderModule;
exports.MedicalOrderModule = MedicalOrderModule = __decorate([
    (0, common_1.Module)({
        controllers: [medical_order_controller_1.MedicalOrderController],
        providers: [
            medical_order_service_1.MedicalOrderService,
            {
                provide: 'MedicalOrderRepository',
                useClass: prisma_medical_order_repository_1.PrismaMedicalOrderRepository,
            },
        ],
        exports: [medical_order_service_1.MedicalOrderService],
    })
], MedicalOrderModule);
//# sourceMappingURL=medical-order.module.js.map