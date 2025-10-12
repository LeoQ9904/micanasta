import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function HeaderPage({
    title,
    Icon,
}: {
    title: string;
    Icon?: any;
}) {
    const router = useRouter();

    const onBack = () => {
        router.back();
    };
    return (
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <IconButton onClick={onBack} sx={{ mr: 2 }}>
                <ArrowBack />
            </IconButton>
            {Icon}
            <Typography variant="h4" fontWeight="bold">
                {title}
            </Typography>
        </Box>
    );
}
