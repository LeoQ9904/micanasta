import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ExpandMoreOutlined } from "@mui/icons-material";

export default function PopoverMenuComponent({
    Children,
    Title,
    icon = null,
    variant = "text",
}: {
    Children: React.ReactNode;
    Title: string;
    icon?: React.ReactNode;
    variant?: "text" | "contained" | "outlined";
}) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div>
            <Button
                aria-describedby={id}
                variant={variant}
                onClick={handleClick}
                endIcon={<ExpandMoreOutlined />}
                startIcon={icon}
                sx={{
                    textTransform: "none",
                    fontWeight: "700",
                    color: "#4b5563",
                    "&:hover": {
                        backgroundColor: "transparent",
                        color: "var(--primary)",
                    },
                    fontSize: "16px",
                }}
            >
                {Title}
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <div style={{ padding: '16px' }}>{Children}</div>
            </Popover>
        </div>
    );
}
