/**
 * Geographic API Service - MOCK VERSION
 * Service for fetching Colombian departments and cities
 * TODO: Replace with real API integration when backend is ready
 */

export interface Department {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
  departmentId: string;
}

// Mock data for Colombian departments
const mockDepartments: Department[] = [
  { id: '1', name: 'Antioquia' },
  { id: '2', name: 'Atlántico' },
  { id: '3', name: 'Bogotá D.C.' },
  { id: '4', name: 'Bolívar' },
  { id: '5', name: 'Boyacá' },
  { id: '6', name: 'Caldas' },
  { id: '7', name: 'Caquetá' },
  { id: '8', name: 'Cauca' },
  { id: '9', name: 'Cesar' },
  { id: '10', name: 'Córdoba' },
  { id: '11', name: 'Cundinamarca' },
  { id: '12', name: 'Chocó' },
  { id: '13', name: 'Huila' },
  { id: '14', name: 'La Guajira' },
  { id: '15', name: 'Magdalena' },
  { id: '16', name: 'Meta' },
  { id: '17', name: 'Nariño' },
  { id: '18', name: 'Norte de Santander' },
  { id: '19', name: 'Quindío' },
  { id: '20', name: 'Risaralda' },
  { id: '21', name: 'Santander' },
  { id: '22', name: 'Sucre' },
  { id: '23', name: 'Tolima' },
  { id: '24', name: 'Valle del Cauca' },
];

// Mock data for cities by department
const mockCities: Record<string, City[]> = {
  '1': [
    { id: '1-1', name: 'Medellín', departmentId: '1' },
    { id: '1-2', name: 'Envigado', departmentId: '1' },
    { id: '1-3', name: 'Itagüí', departmentId: '1' },
    { id: '1-4', name: 'Bello', departmentId: '1' },
    { id: '1-5', name: 'Rionegro', departmentId: '1' },
  ],
  '2': [
    { id: '2-1', name: 'Barranquilla', departmentId: '2' },
    { id: '2-2', name: 'Soledad', departmentId: '2' },
    { id: '2-3', name: 'Malambo', departmentId: '2' },
  ],
  '3': [
    { id: '3-1', name: 'Bogotá', departmentId: '3' },
  ],
  '4': [
    { id: '4-1', name: 'Cartagena', departmentId: '4' },
    { id: '4-2', name: 'Magangué', departmentId: '4' },
  ],
  '24': [
    { id: '24-1', name: 'Cali', departmentId: '24' },
    { id: '24-2', name: 'Palmira', departmentId: '24' },
    { id: '24-3', name: 'Buenaventura', departmentId: '24' },
    { id: '24-4', name: 'Tuluá', departmentId: '24' },
  ],
};

class GeoApiService {
  async getDepartments(): Promise<Department[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockDepartments;
  }

  async getCities(departmentId: string): Promise<City[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockCities[departmentId] || [];
  }
}

export const geoApiService = new GeoApiService();

