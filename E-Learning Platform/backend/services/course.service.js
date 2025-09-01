import Course from "../models/Course.model.js";
import Video from "../models/Video.model.js";
import logger from "../utils/logger.js";

export const updateTOC = async (courseId, updatedTOC) => {
  const course = await Course.findById(courseId);

  // Validate sequence numbers
  const sequences = updatedTOC.map((item) => item.sequence);
  if (new Set(sequences).size !== sequences.length) {
    throw new Error("Duplicate sequence numbers");
  }

  course.toc = updatedTOC;
  return await course.save();
};

// export const generateTOCFromVideos = async (courseId) => {
//   try {
//     const videos = await Video.find({ course: courseId })
//       .sort("sequence")
//       .select("title duration sequence");

//     const toc = videos.map((video) => ({
//       videoId: video._id,
//       title: video.title,
//       duration: video.duration,
//       sequence: video.sequence,
//       isHidden: false,
//     }));

//     logger.info(`Generated TOC for course ${courseId} with ${toc.length} videos`);
//     return toc;
//   } catch (error) {
//     logger.error(`Failed to generate TOC for course ${courseId}:`, error.message);
//     throw error;
//   }
// };
