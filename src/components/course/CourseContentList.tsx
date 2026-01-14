import React from 'react';
import CourseSectionItem from './CourseSectionItem';
import { ISection } from '@/types/types';

interface Props {
  sections: ISection[];
}

const CourseContentList: React.FC<Props> = ({ sections }) => {
  return (
    <div className="course-content-list">
      {sections.map((section) => (
        <CourseSectionItem key={section.sectionId} section={section} />
      ))}
    </div>
  );
};

export default CourseContentList;