
// src/components/index.js
export { default as ListaPedido } from "./CardPedido/ListaPedido";
export { default as PedidoCard } from "./Pedidos/PedidoCard";
export { default as InicioHero } from "./InicioHero"; // si lo renombraste así

// UI
export { default as AddCartButton } from "./ui/AddCartButton";
export { default as CtaButton } from "./CtaButton/CtaButton.jsx";
export { default as InfoCard } from "./InfoCard/InfoCard.jsx";
export { default as AgendasCard } from "./AgendasCard/AgendasCard.jsx"
export { default as ProductCard } from "./ui/ProductCard";
export { default as FileButton } from "./FileBtn/FileBtn.jsx"

// (Opcional) Re-exportar widgets para importarlos desde el mismo lugar
export { default as Navbar } from "@/widgets/navbar";
export { default as Footer } from "@/widgets/footer";
