'use server'

import mongoose from 'mongoose';                            

const courseSchema = new mongoose.Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    instock: { type: Boolean, required: true },
    rating: { type: String, required: true },
    duration: { type: String, required: true },
    tags: [{ type: String, required: true }],
    level: { type: String, required: true },
    lessons: { type: Number, required: true },
    students: { type: Number, required: true },
    certifications: { type: String, required: true },
    highlights: [{ heading: String, description: String }],
    about: {
        heading: { type: String, required: true },
        description: { type: String, required: true },
        points: [{ heading: String, description: String }],
        image:{type: String}
    },
    tools: [{ type: String, required: true }],
    modules: [{
        name: { type: String, required: true },
        points: [{ type: String, required: true }]
    }],
    reviews: [{
        name: { type: String },
        date: { type: Date },
        image: { type: String },
        rating: { type: Number },
        description: { type: String }
    }],
    isPopular: { type: Boolean, default: false },
    mentors: [{ type: String }],
    frequentQuestions: [{
        question: { type: String, required: true },
        answer: { type: String, required: true }
    }]
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
