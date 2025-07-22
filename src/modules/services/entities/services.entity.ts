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
  type_services: TypeServices[];
  value: number;
  items?: Items[];
};

type Items = {
  id: string;
  name: string;
  value: number;
  description?: string;
};

type TypeServices = {
  id: string;
  name: string;
  value: number;
};
