-- CreateTable
CREATE TABLE `Patient` (
    `patientId` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(20) NOT NULL,
    `firstName` VARCHAR(90) NOT NULL,
    `lastName` VARCHAR(90) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `address` VARCHAR(200) NOT NULL,
    `city` VARCHAR(90) NOT NULL,

    UNIQUE INDEX `Patient_id_key`(`id`),
    UNIQUE INDEX `Patient_email_key`(`email`),
    PRIMARY KEY (`patientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
