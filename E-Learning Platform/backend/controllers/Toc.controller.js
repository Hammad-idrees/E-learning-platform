import TableOfContent from "../models/Toc.model.js";

// Create TOC
export const createTOC = async (req, res) => {
  try {
    const { courseId, content } = req.body;

    if (!courseId || !content) {
      return res
        .status(400)
        .json({ message: "courseId and content are required" });
    }

    const toc = new TableOfContent({ courseId, content });
    await toc.save();

    res.status(201).json({ message: "TOC created successfully", toc });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating TOC", error: error.message });
  }
};

// Updated getTOCsByCourse controller
export const getTOCsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const tocs = await TableOfContent.find({ courseId }).sort({ createdAt: 1 });

    // Return in the format your frontend expects
    res.json({
      success: true,
      data: tocs,
      message: "TOCs fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching TOCs",
      error: error.message,
    });
  }
};

// Update TOC
export const updateTOC = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const toc = await TableOfContent.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!toc) return res.status(404).json({ message: "TOC not found" });

    res.json({ message: "TOC updated successfully", toc });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating TOC", error: error.message });
  }
};

// Delete TOC
export const deleteTOC = async (req, res) => {
  try {
    const { id } = req.params;

    const toc = await TableOfContent.findByIdAndDelete(id);

    if (!toc) return res.status(404).json({ message: "TOC not found" });

    res.json({ message: "TOC deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting TOC", error: error.message });
  }
};
