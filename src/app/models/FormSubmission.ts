import mongoose, { Schema, models, model } from 'mongoose';

export interface IFormSubmission {
  formName: string;
  formData: Record<string, any>;
  createdAt: Date;
  resolved: boolean;
}

const formSubmissionSchema = new Schema<IFormSubmission>({
  formName: { type: String, required: true },
  formData: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false }
}, { timestamps: true });

const FormSubmission = models.FormSubmission || model<IFormSubmission>('FormSubmission', formSubmissionSchema);

export default FormSubmission; 