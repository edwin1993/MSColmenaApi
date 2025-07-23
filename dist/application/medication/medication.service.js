"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationService = void 0;
const common_1 = require("@nestjs/common");
const medication_entity_1 = require("../../domain/medication/medication.entity");
let MedicationService = class MedicationService {
    medicationRepository;
    constructor(medicationRepository) {
        this.medicationRepository = medicationRepository;
    }
    async create(medication) {
        return this.medicationRepository.create(new medication_entity_1.Medication(null, medication.name, medication.description, medication.prescribedFor, null, null));
    }
    async findById(medicationId) {
        return this.medicationRepository.findById(medicationId);
    }
    async findByName(name) {
        return this.medicationRepository.findByName(name);
    }
    async findAll() {
        return this.medicationRepository.findAll();
    }
    async update(medicationId, medication) {
        return this.medicationRepository.update(medicationId, medication);
    }
    async delete(medicationId) {
        return this.medicationRepository.delete(medicationId);
    }
};
exports.MedicationService = MedicationService;
exports.MedicationService = MedicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MedicationRepository')),
    __metadata("design:paramtypes", [Object])
], MedicationService);
//# sourceMappingURL=medication.service.js.map