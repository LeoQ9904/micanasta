"use client";

import { useState } from "react";
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Card,
    CardContent,
    Avatar,
    Chip,
    IconButton,
} from "@mui/material";
import {
    Person,
    LocationOn,
    Settings,
    Edit,
    ArrowBack,
} from "@mui/icons-material";
import { useAuthStore } from "@/app/src/store/authStore";
import UpdateProfileModal from "./UpdateProfileModal";
import AddressList from "./AddressList";
import HeaderPage from "../HeaderPage";

interface ProfileManagementProps {
    onBack?: () => void;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`profile-tabpanel-${index}`}
            aria-labelledby={`profile-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `profile-tab-${index}`,
        "aria-controls": `profile-tabpanel-${index}`,
    };
}

export default function ProfileManagement({ onBack }: ProfileManagementProps) {
    const { customer, user } = useAuthStore();
    const [tabValue, setTabValue] = useState(0);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleUpdateProfile = () => {
        setUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setUpdateModalOpen(false);
    };

    const getDisplayName = () => {
        if (customer?.displayName) return customer.displayName;
        if (user?.displayName) return user.displayName;
        return "Usuario";
    };

    const getAvatarUrl = () => {
        if (customer?.photoURL) return customer.photoURL;
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(getDisplayName())}&background=random`;
    };

    return (
        <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", p: 3 }}>
            <HeaderPage
                title="Gestión de cuenta"
                Icon={<Settings sx={{ mr: 1, color: "var(--primary)" }} />}
            />

            {/* Perfil Summary Card */}
            <Card sx={{ mb: 3, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" }}>
                <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Box sx={{ position: "relative" }}>
                            <Avatar
                                src={getAvatarUrl()}
                                sx={{ width: 80, height: 80 }}
                            />
                            <IconButton
                                onClick={handleUpdateProfile}
                                sx={{
                                    position: "absolute",
                                    bottom: -5,
                                    right: -5,
                                    backgroundColor: "var(--primary)",
                                    color: "white",
                                    width: 30,
                                    height: 30,
                                    "&:hover": {
                                        backgroundColor: "var(--primary)",
                                        opacity: 0.9,
                                    },
                                }}
                            >
                                <Edit fontSize="small" />
                            </IconButton>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" fontWeight="bold">
                                {getDisplayName()}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 1 }}
                            >
                                {customer?.email}
                            </Typography>
                            {customer?.phoneNumber && (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 1 }}
                                >
                                    📞 {customer.phoneNumber}
                                </Typography>
                            )}
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                    flexWrap: "wrap",
                                }}
                            >
                                <Chip
                                    size="small"
                                    label={
                                        user?.emailVerified
                                            ? "Email Verificado"
                                            : "Email No Verificado"
                                    }
                                    color={
                                        user?.emailVerified
                                            ? "success"
                                            : "warning"
                                    }
                                />
                                <Chip
                                    size="small"
                                    label={`${customer?.addresses?.length || 0} Dirección${(customer?.addresses?.length || 0) !== 1 ? "es" : ""}`}
                                    variant="outlined"
                                />
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="profile management tabs"
                    sx={{
                        "& .MuiTabs-indicator": {
                            backgroundColor: "var(--primary)",
                        },
                        "& .MuiTab-root.Mui-selected": {
                            color: "var(--primary)",
                        },
                    }}
                >
                    <Tab
                        icon={<Person />}
                        label="Información Personal"
                        {...a11yProps(0)}
                    />
                    <Tab
                        icon={<LocationOn />}
                        label="Direcciones"
                        {...a11yProps(1)}
                    />
                </Tabs>
            </Box>

            {/* Tab Panels */}
            <TabPanel value={tabValue} index={0}>
                {/* Información Personal */}
                <Card sx={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" }}>
                    <CardContent>
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Person sx={{ color: "var(--primary)" }} />
                            Información Personal
                        </Typography>

                        <Box sx={{ mt: 3 }}>
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Nombre de Usuario
                                </Typography>
                                <Typography variant="body1">
                                    {customer?.displayName || "No especificado"}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Correo Electrónico
                                </Typography>
                                <Typography variant="body1">
                                    {customer?.email}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Número Telefónico
                                </Typography>
                                <Typography variant="body1">
                                    {customer?.phoneNumber || "No especificado"}
                                </Typography>
                            </Box>

                            <Box sx={{ textAlign: "center", mt: 4 }}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 2 }}
                                >
                                    ¿Necesitas actualizar tu información?
                                </Typography>
                                <IconButton
                                    onClick={handleUpdateProfile}
                                    sx={{
                                        backgroundColor: "var(--primary)",
                                        color: "white",
                                        width: 60,
                                        height: 60,
                                        "&:hover": {
                                            backgroundColor: "var(--primary)",
                                            opacity: 0.9,
                                        },
                                    }}
                                >
                                    <Edit />
                                </IconButton>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                {/* Gestión de Direcciones */}
                <AddressList />
            </TabPanel>

            {/* Modal de actualización de perfil */}
            <UpdateProfileModal
                open={updateModalOpen}
                onClose={handleCloseUpdateModal}
            />
        </Box>
    );
}
