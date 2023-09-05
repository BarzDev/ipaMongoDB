// Menangani permintaan POST untuk membuat topik
server.post("/api/topics", async (req, res) => {
  try {
    const { title, description } = req.body;
    const topic = new Topic({ title, description });
    await topic.save();
    res.status(201).json({ message: "Topic Created" });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    res.status(500).json({ error: "Internal Server Error: Terjadi kesalahan saat membuat topic" });
  }
});

// Menangani permintaan GET untuk mendapatkan daftar topik
server.get("/api/topics", async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json({ topics });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    res.status(500).json({ error: "Internal Server Error: Terjadi kesalahan saat mengambil topik" });
  }
});

// Menangani permintaan DELETE untuk menghapus topik berdasarkan ID
server.delete("/api/topics/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Topic.findByIdAndDelete(id);
    res.status(200).json({ message: "Topic Deleted" });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    res.status(500).json({ error: "Internal Server Error: Terjadi kesalahan saat menghapus topik" });
  }
});

// Menangani permintaan PUT untuk memperbarui topik berdasarkan ID
server.put("/api/topics/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { newTitle: title, newDescription: description } = req.body;
    await Topic.findByIdAndUpdate(id, { title, description });
    res.status(200).json({ message: "Topic updated" });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    res.status(500).json({ error: "Internal Server Error: Terjadi kesalahan saat memperbarui topik" });
  }
});

server.get("/api/topics/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const topic = await Topic.findOne({ _id: id });
    res.status(200).json({ topic });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    res.status(500).json({ error: "Internal Server Error: Terjadi kesalahan saat mengambil topik" });
  }
});
