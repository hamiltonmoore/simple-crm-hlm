import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { Note } from "./entity/Note";
import * as express from "express";

const run = async () => {
    await AppDataSource.initialize();
    const app = express();
    app.use(express.json());
    app.get("/users", async (req, res) => {
        const users = await AppDataSource.manager.getRepository(User).find();
        res.json(users);
    });
    app.post("/users", async (req, res) => {
        const user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.phoneNumber = req.body.phoneNumber;
        await AppDataSource.manager.getRepository(User).save(user);
        res.json(user);
    });
    app.put("/users/:id", async (req, res) => {
        const user = await AppDataSource.manager
            .getRepository(User)
            .findOne({ where: { id: req.params.id } });
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.phoneNumber = req.body.phoneNumber;
        await AppDataSource.manager.getRepository(User).save(user);
        res.json(user);
    });
    app.post("/users/:id/notes", async (req, res) => {
        const userId = Number(req.params.id);
        const { note } = req.body;

        if (!note) {
            return res.status(400).json({ error: "Note content is required" });
        }

        const userRepository = AppDataSource.manager.getRepository(User);
        const user = await userRepository.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const noteRepository = AppDataSource.manager.getRepository(Note);
        const newNote = new Note();
        newNote.content = note;
        newNote.user = user;

        try {
            await noteRepository.save(newNote);
            return res.status(201).json({
                message: "Note added successfully",
                note: newNote,
            });
        } catch (error) {
            return res.status(500).json({
                error: "Failed to add note",
                details: error,
            });
        }
    });
    app.delete("/users/:id", async (req, res) => {
        const userId = Number(req.params.id);
        const userRepository = AppDataSource.manager.getRepository(User);
        const noteRepository = AppDataSource.manager.getRepository(Note);
    
        try {
            // Delete notes associated with the user
            await noteRepository.delete({ user: { id: userId } });
    
            // Delete the user
            const result = await userRepository.delete({ id: userId });
    
            // Check if the user was found and deleted
            if (result.affected === 0) {
                return res.status(404).json({ error: "User not found" });
            }
    
            res.status(204).send();
        } catch (err) {
            console.error("Delete error:", err);
            res.status(500).json({ error: "Failed to delete user" });
        }
    });
    app.get("/users/:id", async (req, res) => {
        const userId = Number(req.params.id);
        const userRepository = AppDataSource.manager.getRepository(User);
        const user = await userRepository.findOne({
          where: { id: userId },
          relations: ["notes"],
        });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    });
      
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
};

run();
