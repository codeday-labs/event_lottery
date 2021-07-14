package routes

import (
	"github.com/codeday-labs/2021_event_lottery/controllers"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/api/v1/event", controllers.GetEvents)
	app.Post("/api/v1/event", controllers.CreateEvent)
	app.Get("/api/v1/event/:id", controllers.GetEvent)
	app.Post("/api/v1/event/:id", controllers.RegisterUser)
	app.Get("/api/v1/lottery/:id", controllers.GetLotteryWinners)
}
