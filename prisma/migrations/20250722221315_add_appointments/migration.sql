-- CreateTable
CREATE TABLE `Appointment` (
    `appointmentId` INTEGER NOT NULL AUTO_INCREMENT,
    `doctorId` INTEGER NOT NULL,
    `patientId` INTEGER NOT NULL,
    `appointmentDate` DATETIME(3) NOT NULL,
    `status` ENUM('PROGRAMADA', 'ASISTIO', 'NO_ASISTIO') NOT NULL DEFAULT 'PROGRAMADA',
    `statusUpdateDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Appointment_doctorId_appointmentDate_key`(`doctorId`, `appointmentDate`),
    PRIMARY KEY (`appointmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`doctorId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`patientId`) ON DELETE RESTRICT ON UPDATE CASCADE;
