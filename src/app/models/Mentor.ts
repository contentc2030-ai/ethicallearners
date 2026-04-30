'use server'

import mongoose, { Document, Schema } from 'mongoose';

interface Experience {
  institute: string;
  startYear: number;
  endYear: number;
  speciality: string[];
}

interface SocialMedia{
  name: string;
  link: string;
}

interface IMentor extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  image: string;
  experience: Experience[];
  skills: string[];
  speciality: string;
  about: string;
  address: string;
  cv: string;
  socialMedias: SocialMedia[];
}

const mentorSchema = new Schema<IMentor>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  experience: [
    {
      institute: { type: String, required: true },
      startYear: { type: Number, required: true },
      endYear: { type: Number, required: true },
      speciality: { type: [String], required: true },
    },
  ],
  skills: { type: [String], required: true },
  speciality: { type: String, required: true },
  about: { type: String, required: true },
  address: { type: String, required: true },
  cv:{ type: String, required: true},
  socialMedias:[
    {
      name: { type: String, required: true},
      link:{ type: String, required: true}
    }
  ]
});

const Mentor = mongoose.models.Mentor || mongoose.model<IMentor>('Mentor', mentorSchema);

export default Mentor;