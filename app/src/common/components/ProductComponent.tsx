import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Dialog,
    DialogContent,
    Tooltip,
} from "@mui/material";
import CartComponent from "../../assets/icons/cart";
import { IProduct } from "../../interfaces/product/Product";
import { useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { VisibilityOutlined } from "@mui/icons-material";
import CloseButton from "./utils/close";
import ArrowLeft from "./utils/arrowLeft";
import ArrowRight from "./utils/arrowRight";
import Quantity from "./utils/quantity";
import { calculateDiscountedPrice } from "../hooks/useCalculateDiscounted";

interface ProductoComponentProps {
    producto: IProduct;
}

export default function ProductComponent({ producto }: ProductoComponentProps) {
    const [focused, setFocused] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [hoverImageIndex, setHoverImageIndex] = useState(0);
    const { addItem } = useCartStore();

    const handleClose = () => {
        setOpen(!open);
    };

    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % producto.images.length);
    };

    const prevImage = () => {
        setSelectedImage(
            (prev) =>
                (prev - 1 + producto.images.length) % producto.images.length
        );
    };
    return (
        <>
            <Card
                tabIndex={0}
                sx={{
                    boxShadow: "none",
                    borderRadius: "16px",
                    border: "1px solid #ececec",
                    position: "relative",
                    ":hover": {
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                        transition: "box-shadow 0.3s ease-in-out",
                    },
                }}
                onMouseEnter={() => {
                    setFocused(true);
                    const interval = setInterval(() => {
                        setHoverImageIndex(
                            (prev) => (prev + 1) % producto.images.length
                        );
                    }, 1500);
                    return () => clearInterval(interval);
                }}
                onMouseLeave={() => {
                    setFocused(false);
                    setHoverImageIndex(0);
                }}
            >
                <CardHeader
                    title={`- ${producto.discount}%`}
                    sx={{
                        color: "white",
                        bgcolor: "rgb(206, 55, 58)",
                        borderRadius: "16px 0",
                        width: "fit-content",
                        p: "0.25rem 0.75rem",
                        position: "absolute",
                        zIndex: 1,
                        "& .MuiCardHeader-title": {
                            fontSize: "0.875rem",
                            fontWeight: "normal",
                        },
                    }}
                />
                <CardMedia
                    component="img"
                    height=""
                    alt="Product Image"
                    image={
                        focused
                            ? producto.images[hoverImageIndex]
                            : producto.image
                    }
                    className="cursor-pointer"
                ></CardMedia>
                <CardContent className="flex flex-col gap-3">
                    <div>
                        <div className="text-xs text-gray-500">
                            {producto.categories.map((categoria, index) => (
                                <a
                                    key={index}
                                    className="cursor-pointer"
                                    href="#"
                                >
                                    {categoria.name}
                                    {index < producto.categories.length - 1 &&
                                        ", "}
                                </a>
                            ))}
                        </div>
                        <a className="font-bold text-sm md:text-lg text-gray-700 cursor-pointer hover:text-[var(--primary)] transition-colors duration-300 line-clamp-2">
                            {producto.title}
                        </a>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 justify-between items-start md:items-center">
                        <p className="text-[var(--primary)] text-lg md:text-xl font-bold">
                            ${producto.price}&nbsp;
                            <span className="line-through text-xs md:text-sm text-gray-400">
                                $
                                {calculateDiscountedPrice(
                                    producto.price,
                                    producto.discount
                                )}
                            </span>
                        </p>
                        <button
                            onClick={() => addItem(producto, 1)}
                            className="flex gap-1 items-center py-2 md:py-1 px-3 md:px-2 rounded bg-[rgb(var(--primary-),.1)] cursor-pointer hover:scale-[1.05] transition-transform duration-300 text-sm text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white justify-center w-full md:flex-1"
                        >
                            <CartComponent width={16} />
                            Agregar
                        </button>
                    </div>
                </CardContent>
                {focused && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <Tooltip title="Vista previa" placement="top">
                            <button
                                className="bg-white px-3 py-1 rounded border border-gray-300 cursor-pointer pointer-events-auto hover:bg-[var(--primary)] hover:text-white transition-colors duration-300 flex items-center gap-1"
                                onClick={handleClose}
                            >
                                <VisibilityOutlined />
                            </button>
                        </Tooltip>
                    </div>
                )}
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                sx={{
                    "& .MuiDialog-paper": {
                        margin: { xs: "16px", md: "32px" },
                        maxHeight: {
                            xs: "calc(100% - 32px)",
                            md: "calc(100% - 64px)",
                        },
                    },
                }}
            >
                <DialogContent
                    sx={{
                        minHeight: { xs: "auto", md: "500px" },
                        position: "relative",
                        padding: { xs: "16px", md: "24px" },
                    }}
                >
                    <CloseButton onClick={handleClose} />
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        <div className="w-full">
                            <div className="w-full flex items-center justify-center border border-gray-200 rounded-xl p-2 md:p-4 mb-4 relative">
                                <ArrowLeft onClick={prevImage} />
                                <img
                                    src={producto.images[selectedImage]}
                                    alt={producto.title}
                                    className="max-w-full max-h-full"
                                />
                                <ArrowRight onClick={nextImage} />
                            </div>
                            <div className="flex gap-2 justify-center overflow-x-auto">
                                {producto.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`${producto.title} ${index + 1}`}
                                        className={`w-12 h-12 md:w-16 md:h-16 object-cover rounded cursor-pointer border-2 flex-shrink-0 ${
                                            selectedImage === index
                                                ? "border-[var(--primary)]"
                                                : "border-gray-200"
                                        }`}
                                        onClick={() => setSelectedImage(index)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-4 md:gap-10 justify-center">
                            {producto.discount > 0 && (
                                <p className="text-lg md:text-xl text-yellow-500 font-bold">
                                    !En oferta¡ - {producto.discount}% de
                                    descuento
                                </p>
                            )}
                            <a className="font-bold text-gray-700 cursor-pointer hover:text-[var(--primary)] transition-colors duration-300 text-2xl md:text-4xl">
                                {producto.title}
                            </a>
                            <div className="flex flex-col md:flex-row gap-2 items-start md:items-center font-bold">
                                <p className="text-[var(--primary)] text-3xl md:text-6xl">
                                    ${producto.price}&nbsp;
                                </p>
                                <div className="flex flex-col">
                                    <span className="text-lg md:text-xl text-yellow-500">
                                        - {producto.discount}%
                                    </span>
                                    <span className="line-through text-lg md:text-2xl text-gray-400">
                                        $
                                        {calculateDiscountedPrice(
                                            producto.price,
                                            producto.discount
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
                                <Quantity
                                    quantity={quantity}
                                    onIncrement={() =>
                                        setQuantity(quantity + 1)
                                    }
                                    onDecrement={() =>
                                        setQuantity(Math.max(1, quantity - 1))
                                    }
                                    setQuantity={setQuantity}
                                />
                                <button
                                    onClick={() => {
                                        addItem(producto, quantity);
                                        handleClose();
                                    }}
                                    className="flex gap-1 items-center py-3 md:py-2 px-4 rounded cursor-pointer hover:scale-[1.05] transition-transform duration-300 bg-[var(--primary)] text-white justify-center flex-1"
                                >
                                    <CartComponent width={16} />
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
