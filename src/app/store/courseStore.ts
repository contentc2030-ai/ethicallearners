import { create } from 'zustand';

export const useCourseStore = create((set:any) => ({
  selectedCourse: null,
  setSelectedCourse: (course) => set({ selectedCourse: course }),
}));