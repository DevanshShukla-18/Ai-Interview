const mongoose = require('mongoose');

/**
 * - Job description schema
 * - resume text
 * - self description
 * 
 * - matchScore : Number
 * 
 * - technical question :[]
 * - behavioural question :[]
 * - skill gaps :[]
 * - preparation plan :[{}]
 */

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required."]
    },
    intention: {
        type: String,
        required: [true, "Intention is required."]
    },
    answer: {
        type: String,
        required: [true, "Answer is reqiored."]
    }
},{
    _id: false
})

const behaviouralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Behavioural question is required."]
    },
    intention: {
        type: String,
        required: [true, "Intention is required."]
    },
    answer: {
        type: String,
        required: [true, "Answer is reqiored."]
    }
},{
    _id: false
})

const skillGapsSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required."]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        reqyured: [true, "Severity is required."]
    }
},{
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required."]
    },
    focus: {
        type: String,
        required: [true, "Focus is required."]
    },
    tasks: {
        type: [String],
        required: [true, "Tasks is required."]
    }
},{
    _id: false
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job description is required."]
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [technicalQuestionSchema],
    behaviouralQuestions: [behaviouralQuestionSchema],
    skillGaps: [skillGapsSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        required: [true, "Title is required."]
    }
},{
    timestamps: true
})

const InterviewReportModel = mongoose.model('InterviewReport', interviewReportSchema);

module.exports = InterviewReportModel;