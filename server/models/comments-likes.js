const mongoose = require("mongoose");

const EventMetaDataSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      unique: true,
    },
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment_text: {
          type: String,
          required: true,
          minlength: [1, "Comment must be at least 1 character"],
          maxlength: [500, "Comment cannot be more than 500 characters"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },

        comment_likes: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              unique: true,
            },
            comment_like_added_at: {
              type: Date,
              default: Date.now,
            },
          },
        ],

        comment_dislikes: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            comment_dislike_added_at: {
              type: Date,
              default: Date.now,
            },
          },
        ],
        comment_total_likes: {
          type: Number,
          //default: 0,//
        },

        comment_total_dislikes: {
          type: Number,
          //default: 0,//
        },
      },
    ],

    //end of comment

    // event likes
    event_likes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        event_like_added_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    event_total_comments: {
      type: Number,
      default: 0,
    },

    event_total_likes: {
      type: Number,
      default: 0,
    },
    event_total_dislikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// EventMetaDataSchema.methods.addComment = async function (userId, commentText) {
//   try {
//     // Add the new comment
//     this.comments.push({
//       user_id: userId,
//       text: commentText,
//     });

//     // Increment total comments
//     this.event_total_comments += 1;

//     // Save the updated document
//     await this.save();

//     return this; // Return the updated document
//   } catch (error) {
//     throw new Error("Failed to add comment ");
//   }
// };

// EventMetaDataSchema.methods.likeComment = async function (userId) {
//   try {
//     // Add the new comment
//     this.comments.comment_likes.push({
//       userId: userId,
//     });

//     // Increment total comments
//     this.comment_total_likes += 1;

//     // Save the updated document
//     await this.save();

//     return this; // Return the updated document
//   } catch (error) {
//     throw new Error("Failed to add comment like  ");
//   }
// }

//   EventMetaDataSchema.methods.likeEvent = async function (userId) {
//   try {
//     // Add the new comment
//     this.comments.comment_likes.push({
//       userId: userId,
//     });

//     // Increment total comments
//     this.comment_total_likes += 1;

//     // Save the updated document
//     await this.save();

//     return this; // Return the updated document
//   } catch (error) {
//     throw new Error("Failed to add comment like  ");
//   }
// };

module.exports = mongoose.model("EventMetaData", EventMetaDataSchema);
