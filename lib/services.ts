export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  priceStart?: number;
  features: string[];
}

export const services: Service[] = [
  {
    id: 'repair-express',
    title: 'Reparación Express',
    description: 'Hardware en menos de 24h con componentes certificados.',
    icon: '⚡',
    priceStart: 29,
    features: ['Diagnóstico gratuito', 'Piezas originales', 'Garantía 6 meses']
  },
  {
    id: 'deep-clean',
    title: 'Limpieza e Higiene IT',
    description: 'Descontaminación profunda para mejorar rendimiento.',
    icon: '🧼',
    priceStart: 45,
    features: ['Eliminación de polvo', 'Pasta térmica nueva', 'Desinfección externa']
  },
  {
    id: 'eco-recycling',
    title: 'Reciclaje Certificado',
    description: 'Gestión ética y responsable de residuos electrónicos.',
    icon: '♻️',
    features: ['Certificado de destrucción', 'Recogida a domicilio', '0% vertedero']
  }
];
