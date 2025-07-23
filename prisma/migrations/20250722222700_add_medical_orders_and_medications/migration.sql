-- CreateTable
CREATE TABLE `MedicalOrder` (
    `medicalOrderId` INTEGER NOT NULL AUTO_INCREMENT,
    `appointmentId` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `expirationDate` DATETIME(3) NOT NULL,
    `specialty` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`medicalOrderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medication` (
    `medicationId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `description` TEXT NOT NULL,
    `prescribedFor` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Medication_name_key`(`name`),
    PRIMARY KEY (`medicationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MedicalOrderMedication` (
    `medicalOrderId` INTEGER NOT NULL,
    `medicationId` INTEGER NOT NULL,

    PRIMARY KEY (`medicalOrderId`, `medicationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MedicalOrder` ADD CONSTRAINT `MedicalOrder_appointmentId_fkey` FOREIGN KEY (`appointmentId`) REFERENCES `Appointment`(`appointmentId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicalOrderMedication` ADD CONSTRAINT `MedicalOrderMedication_medicalOrderId_fkey` FOREIGN KEY (`medicalOrderId`) REFERENCES `MedicalOrder`(`medicalOrderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicalOrderMedication` ADD CONSTRAINT `MedicalOrderMedication_medicationId_fkey` FOREIGN KEY (`medicationId`) REFERENCES `Medication`(`medicationId`) ON DELETE RESTRICT ON UPDATE CASCADE;
