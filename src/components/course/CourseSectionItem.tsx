import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, List, ListItemIcon } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LaunchIcon from '@mui/icons-material/Launch';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CourseLessonItem from './CourseLessonItem';
import { ISection } from '@/types/types';

interface Props {
  section: ISection;
}

const CourseSectionItem: React.FC<Props> = ({ section }) => {
  // Case 1: Mục hiển thị phẳng (Standalone)
  if (section.displayType === 'standalone') {
    return (
      <div className="standalone-root">
        <Box display="flex" alignItems="center">
          <ListItemIcon classes={{ root: "lesson-icon-wrapper" }}>
            {section.type === 'video' ? <PlayCircleIcon /> : <MenuBookIcon />}
          </ListItemIcon>
          <Box>
            <Typography variant="subtitle2" fontWeight={700}>{section.title}</Typography>
            <Typography variant="caption" color="textSecondary">{section.subTitle}</Typography>
          </Box>
        </Box>
        <Typography className="progress-indicator">{section.progress}</Typography>
      </div>
    );
  }

  // Case 2: Mục hiển thị đóng mở (Accordion)
  return (
    <Accordion classes={{ root: "section-accordion-root" }}
    expanded={true}>
      <AccordionSummary >
        <div className="summary-content">
          <Box>
            <Typography variant="subtitle2" fontWeight={800}>{section.title}</Typography>
            <Typography variant="caption" color="textSecondary">{section.description}</Typography>
          </Box>
          <LaunchIcon color="primary" fontSize="small" />
        </div>
      </AccordionSummary>
      <AccordionDetails style={{ padding: 0 }}>
        <List disablePadding>
          {section.lessons.map((lesson, index) => (
            <CourseLessonItem 
              key={lesson.id} 
              lesson={lesson} 
              isLast={index === section.lessons.length - 1} 
            />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default CourseSectionItem;