import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { ILesson } from '@/types/types';

interface Props {
  lesson: ILesson;
  isLast: boolean;
}

const CourseLessonItem: React.FC<Props> = ({ lesson, isLast }) => {
  // Logic class để điều khiển đường kẻ dọc
  const itemClasses = isLast ? "lesson-item-root is-last-lesson" : "lesson-item-root";

  return (
    <ListItem classes={{ root: itemClasses }}>
      <div className="timeline-line" />
      <div className="order-badge">{lesson.order}</div>

      <ListItemIcon classes={{ root: "lesson-icon-wrapper" }}>
        {lesson.type === 'video' ? <PlayCircleIcon fontSize="small" /> : <MenuBookIcon fontSize="small" />}
      </ListItemIcon>

      <ListItemText
        primary={<Typography variant="subtitle2" fontWeight={700}>{lesson.title}</Typography>}
        secondary={lesson.subTitle}
      />

      <Typography className="progress-indicator">{lesson.progress}</Typography>
    </ListItem>
  );
};

export default CourseLessonItem;