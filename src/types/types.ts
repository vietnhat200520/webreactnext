export interface Category {
  id: string;
  school: string;
  branch: string[];
  image: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  school: string;
  branch: string;
  color: string;
  rating: number;
}

// Thêm các interface cho Feedback, Community, Banner...