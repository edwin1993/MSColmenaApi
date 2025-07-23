-- CreateTable
CREATE TABLE `Doctor` (
    `doctorId` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(20) NOT NULL,
    `firstName` VARCHAR(90) NOT NULL,
    `lastName` VARCHAR(90) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `address` VARCHAR(200) NOT NULL,
    `city` VARCHAR(90) NOT NULL,
    `professionalCard` VARCHAR(50) NOT NULL,
    `admissionDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Doctor_id_key`(`id`),
    UNIQUE INDEX `Doctor_email_key`(`email`),
    UNIQUE INDEX `Doctor_professionalCard_key`(`professionalCard`),
    PRIMARY KEY (`doctorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
