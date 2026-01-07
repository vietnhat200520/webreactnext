'use client';

import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import './Sidebar.css';

// Interface chuẩn cho Category (Trường học)
interface Category {
  id: string;
  school: string;
  branch?: string[];
  image?: string;
}

interface SidebarProps {
  categories: Category[];
}

const Sidebar: React.FC<SidebarProps> = ({ categories }) => {
  const [openMain, setOpenMain] = useState<boolean>(false);
  
  // Định nghĩa kiểu Record để map id (string) với trạng thái boolean
  const [openSub, setOpenSub] = useState<Record<string, boolean>>({});
  const [active, setActive] = useState<string | null>(null);

  const toggleMain = () => setOpenMain(!openMain);

  const toggleSub = (id: string) => {
    setOpenSub((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClickCategory = (id: string, hasSubmenu: boolean) => {
    setActive(id);
    if (hasSubmenu) {
      toggleSub(id);
    }
  };

  return (
    <aside>
      <Box className="sidebar">
        {/* BUTTON CHÍNH */}
        <Button
          onClick={toggleMain}
          classes={{ root: 'sidebar-button' }}
          startIcon={<MenuIcon />}
        >
          Danh mục khóa học
        </Button>

        <Collapse in={openMain}>
          <List className="sidebar-list">
            {categories.map((cat) => (
              <Box key={cat.id}>
                {/* ITEM CHA */}
                <ListItemButton
                  onClick={() =>
                    handleClickCategory(cat.id, (cat.branch?.length ?? 0) > 0)
                  }
                  className={active === cat.id ? 'list-item-active' : ''}
                >
                  <ListItemText
                    primary={cat.school}
                    classes={{ primary: 'item-text-primary' }}
                  />

                  {(cat.branch?.length ?? 0) > 0 && (
                    <ListItemIcon 
                      className={`arrow-icon ${openSub[cat.id] ? 'open' : ''}`}
                    >
                      <KeyboardArrowDownIcon />
                    </ListItemIcon>
                  )}
                </ListItemButton>

                {/* SUBMENU */}
                {(cat.branch?.length ?? 0) > 0 && (
                  <Collapse in={openSub[cat.id]}>
                    <List className="submenu">
                      {cat.branch?.map((item, index) => {
                        const subId = `${cat.id}-${index}`;
                        return (
                          <ListItemButton
                            key={subId}
                            onClick={() => setActive(subId)}
                            className={active === subId ? 'list-item-active' : ''}
                          >
                            <ListItemText
                              primary={item}
                              classes={{ primary: 'sub-item-text-primary' }}
                            />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
                <Divider />
              </Box>
            ))}
          </List>
        </Collapse>
      </Box>
    </aside>
  );
};

export default Sidebar;