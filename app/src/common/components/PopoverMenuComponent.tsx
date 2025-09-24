import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ExpandMoreOutlined } from "@mui/icons-material";

export default function PopoverMenuComponent({
    Children,
    Title,
}: {
    Children: React.ReactNode;
    Title: string;
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
                variant="text"
                onClick={handleClick}
                endIcon={<ExpandMoreOutlined />}
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
                <Typography sx={{ p: 2 }}>{Children}</Typography>
            </Popover>
        </div>
    );
}
