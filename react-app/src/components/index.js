
// src/components/index.js
export { default as OrderList } from "./OrderCard/OrderList";
export { default as OrderCard } from "./Pedidos/OrderCard";
export { default as InicioHero } from "./InicioHero"; // si lo renombraste así

// UI
export { default as AddCartButton } from "./ui/AddCartButton";
export { default as CtaButton } from "./CtaButton/CtaButton.jsx";
export { default as InfoCard } from "./InfoCard/InfoCard.jsx";
export { default as AgendasCard } from "./AgendasCard/AgendasCard.jsx"
export { default as ProductCard } from "./ui/ProductCard";
export { default as FileButton } from "./FileBtn/FileBtn.jsx"
export { default as Comanda } from "./Comanda/Comanda.jsx"
export { default as DetalleModal } from "./DetalleModal/DetalleModal.jsx"


// (Opcional) Re-exportar widgets para importarlos desde el mismo lugar
export { default as Navbar } from "@/widgets/navbar";
export { default as Footer } from "@/widgets/footer";

