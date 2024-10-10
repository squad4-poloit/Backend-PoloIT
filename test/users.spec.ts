import request from "supertest";
import app from "@app"; // Asegúrate de que apunte al archivo que inicia tu app de Express
import UserService from "@services/users.service";

// Mock del UserService
jest.mock("@services/users.service");

describe("Users Controller", () => {
	describe("GET /users", () => {
		it("should return a paginated list of users", async () => {
			// Mocking the service methods
			const mockUsers = [{ id: 1, name: "John Doe" }];
			const mockTotalUsers = 1;

			(UserService.paginatedListUsers as jest.Mock).mockResolvedValue(
				mockUsers,
			);
			(UserService.getTotalUsers as jest.Mock).mockResolvedValue(
				mockTotalUsers,
			);

			const res = await request(app)
				.get("/users")
				.query({ page: 1, limit: 10 });

			expect(res.status).toBe(200);
			expect(res.body.status).toBe("200");
			expect(res.body.data.users).toEqual(mockUsers);
			expect(res.body.data.info.totalUsers).toBe(mockTotalUsers);
		});
	});

	describe("GET /users/:id", () => {
		it("should return a single user", async () => {
			const mockUser = { id: 1, name: "John Doe" };
			(UserService.getUser as jest.Mock).mockResolvedValue(mockUser);

			const res = await request(app).get("/users/1");

			expect(res.status).toBe(200);
			expect(res.body.status).toBe("200");
			expect(res.body.data).toEqual(mockUser);
		});

		it("should return 404 if user is not found", async () => {
			(UserService.getUser as jest.Mock).mockResolvedValue(null);

			const res = await request(app).get("/users/999");

			expect(res.status).toBe(404);
		});
	});

	describe("PUT /users/:id", () => {
		it("should update a user", async () => {
			const mockUpdatedUser = { id: 1, name: "John Doe Updated" };
			(UserService.updateUser as jest.Mock).mockResolvedValue(mockUpdatedUser);

			const res = await request(app)
				.put("/users/1")
				.send({ name: "John Doe Updated" });

			expect(res.status).toBe(200);
			expect(res.body.status).toBe("200");
			expect(res.body.data).toEqual(mockUpdatedUser);
		});
	});

	describe("DELETE /users/:id", () => {
		it("should delete a user", async () => {
			const mockDeletedUser = { id: 1, name: "John Doe" };
			(UserService.deleteUser as jest.Mock).mockResolvedValue(mockDeletedUser);

			const res = await request(app).delete("/users/1");

			expect(res.status).toBe(200);
			expect(res.body.status).toBe("200");
			expect(res.body.data).toEqual(mockDeletedUser);
		});
	});
});
