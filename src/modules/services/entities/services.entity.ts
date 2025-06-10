export type Service = {
  id: string;
  client: string;
  date: Date;
  vehicle: string;
  plate: string;
  particular: boolean;
  enterprise: boolean;
  enterprise_name?: string | null;
  phone: string;
  diagnoses: string;
  employeesId: string | null;
  helpersId?: string | null;
  type_services: TypeService[];
};

export type TypeService = {
  id: string;
  name: string;
  value: number;
};
