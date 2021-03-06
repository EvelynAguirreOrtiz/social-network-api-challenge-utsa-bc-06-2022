const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// Reaction (SCHEMA ONLY)
const ReactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		reactionBody: {
			type: String,
			required: true,
			maxLength: 280,
		},
		userName: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) => dateFormat(createdAtVal),
		},
	},
	{
		toJSON: {
			getters: true,
		},
	}
);

// Thought model
const ThoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			minLength: 1,
			maxLength: 280,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) => dateFormat(createdAtVal),
		},
		userName: {
			type: String,
			required: true,
		},
		reactions: [ReactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

// Virtual that retrieves the length of the thought's reactions array
ThoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
