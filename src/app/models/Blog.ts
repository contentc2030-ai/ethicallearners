import mongoose, { Schema, model, Document } from 'mongoose';

interface BlogPost extends Document {
  title: string;
  description: string;
  content: string;
  posterImage: string;
  backgroundImage: string;
  author: string;
  date: string;
  tags: string[];
  slug: string;
}

const BlogSchema = new Schema<BlogPost>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  posterImage: { type: String, required: true },
  backgroundImage: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  tags: { type: [String], required: true },
}, { timestamps: true });

export default mongoose.models.Blog || model<BlogPost>('Blog', BlogSchema);
