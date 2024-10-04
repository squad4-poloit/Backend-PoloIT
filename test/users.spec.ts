import request from "supertest";
import app from "@src/app"; // Asegúrate de que esta ruta sea correcta
import UserService from "@src/services/users.service";

// Mockear el servicio UserService
jest.mock("../src/services/usersService.ts");

describe("User Controller", () => {
	describe("GET /users", () => {
		it("should return a list of users", async () => {
			const mockUsers = [{ id: 1, name: "John Doe" }];
			(UserService.paginatedListUsers as jest.Mock).mockResolvedValue(
				mockUsers,
			);

			const response = await request(app).get("/users");
			expect(response.status).toBe(200);
			expect(response.body).toEqual({ status: "200", data: mockUsers });
		});

		it("should return 404 if users not found", async () => {
			(UserService.paginatedListUsers as jest.Mock).mockRejectedValue(
				new Error("Not Found"),
			);

			const response = await request(app).get("/users");
			expect(response.status).toBe(404);
			expect(response.text).toBe("Not Found");
		});
	});

	describe("GET /users/:id", () => {
		it("should return a user by ID", async () => {
			const mockUser = { id: 1, name: "John Doe" };
			(UserService.getUser as jest.Mock).mockResolvedValue(mockUser);

			const response = await request(app).get("/users/1");
			expect(response.status).toBe(400);
			expect(response.body).toEqual({ status: "400", data: mockUser });
		});

		it("should return 404 if user not found", async () => {
			(UserService.getUser as jest.Mock).mockRejectedValue(
				new Error("Not Found"),
			);

			const response = await request(app).get("/users/1");
			expect(response.status).toBe(404);
			expect(response.body).toEqual({ status: "404", data: "Not Found" });
		});
	});

	describe("POST /users", () => {
		it("should create a new user", async () => {
			const newUserData = { name: "John Doe" };
			const mockUser = { id: 1, ...newUserData };
			(UserService.createUser as jest.Mock).mockResolvedValue(mockUser);

			const response = await request(app).post("/users").send(newUserData);
			expect(response.status).toBe(400);
			expect(response.body).toEqual({ status: "400", data: mockUser });
		});

		it("should return 404 on error", async () => {
			const newUserData = { name: "John Doe" };
			(UserService.createUser as jest.Mock).mockRejectedValue(
				new Error("Not Found"),
			);

			const response = await request(app).post("/users").send(newUserData);
			expect(response.status).toBe(404);
			expect(response.body).toEqual({ status: "404", data: "Not Found" });
		});
	});

	describe("PUT /users/:id", () => {
		it("should update a user", async () => {
			const updatedData = { name: "Jane Doe" };
			const updatedUser = { id: 1, ...updatedData };
			(UserService.updateUser as jest.Mock).mockResolvedValue(updatedUser);

			const response = await request(app).put("/users/1").send(updatedData);
			expect(response.status).toBe(400);
			expect(response.body).toEqual({ status: "400", data: updatedUser });
		});

		it("should return 404 on error", async () => {
			const updatedData = { name: "Jane Doe" };
			(UserService.updateUser as jest.Mock).mockRejectedValue(
				new Error("Not Found"),
			);

			const response = await request(app).put("/users/1").send(updatedData);
			expect(response.status).toBe(404);
			expect(response.body).toEqual({ status: "404", data: "Not Found" });
		});
	});

	describe("DELETE /users/:id", () => {
		it("should delete a user", async () => {
			const deletedUser = { id: 1, name: "John Doe" };
			(UserService.deleteUser as jest.Mock).mockResolvedValue(deletedUser);

			const response = await request(app).delete("/users/1");
			expect(response.status).toBe(400);
			expect(response.body).toEqual({ status: "400", data: deletedUser });
		});

		it("should return 404 on error", async () => {
			(UserService.deleteUser as jest.Mock).mockRejectedValue(
				new Error("Not Found"),
			);

			const response = await request(app).delete("/users/1");
			expect(response.status).toBe(404);
			expect(response.body).toEqual({ status: "404", data: "Not Found" });
		});
	});
});
