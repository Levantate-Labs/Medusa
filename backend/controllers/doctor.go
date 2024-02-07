package controllers

import (
	"strings"

	"github.com/akhil-is-watching/zudeos-tester/repository"
	"github.com/akhil-is-watching/zudeos-tester/storage"
	"github.com/akhil-is-watching/zudeos-tester/types"
	"github.com/gofiber/fiber/v2"
)

func CreateDoctor(c *fiber.Ctx) error {
	var input types.DoctorCreateInput
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data":  err.Error(),
			"error": true,
		})
	}

	repo := repository.NewDoctorRepository(storage.GetDB())
	if err := repo.Create(input); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"data":  err.Error(),
			"error": true,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"data":  "Doctor Created Successfully",
		"error": false,
	})
}

func GetPatientsForDoctor(c *fiber.Ctx) error {
	reqToken := c.Get("Authorization")
	splitToken := strings.Split(reqToken, "Bearer")
	reqToken = strings.TrimSpace(splitToken[1])

	repo := repository.NewDoctorRepository(storage.GetDB())
	patients, err := repo.GetPatients(types.DoctorFirstInput{Email: reqToken})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"data":  err.Error(),
			"error": true,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"data":  patients,
		"error": false,
	})
}
