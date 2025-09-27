import express from "express"
import mongoose from "mongoose"
import Comment from "../models/comment.model.js"
import { checkAuth } from "./../middleware/auth.middleware"

const router = express.Router()

router.post("/new", checkAuth, async (req, res) => {
  try {
    const { video_id, commentText } = req.body

    if (!video_id || !commentText) {
      return res.status(400).json({
        error: "Video ID and Comment Text are required",
      })
    }

    const newComment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      video_id,
      commentText,
      user_id: req.user._id,
    })

    await newComment.save()

    res.status(201).json({
      message: "Comment Added Successfully",
      comment: newComment,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Something went wrong",
      message: error.message,
    })
  }
})

//delete comment
router.delete("/:commentId", checkAuth, async (req, res) => {
  try {
    const { commentId } = req.params

    const comment = await Comment.findById(commentId)

    if (!comment) {
      return res.status(404).json({
        error: "Comment not found",
      })
    }

    if (comment.user_id.toString() !== req.user._id) {
      return res.status(403).json({
        error: "Unauthorized to delete this comment",
      })
    }

    await Comment.findByIdAndDelete(commentId)

    res.status(200).json({
      message: "Comment Deleted Successfully❌",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Something went wrong",
      message: error.message,
    })
  }
})

export default router
