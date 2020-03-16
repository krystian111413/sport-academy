export interface Address {
  street: string;
  city: string;
  buildingNumber: string;
  code: string;
}

export enum UsefulPermission {
  helmsman = 'Sternik',
  powerboating = 'Motorowodny',
  yachtSailor = 'Żeglarz Jachtowy',
  frogman = 'Płetwonurek',
  swimmingInstructor = 'Instruktor Pływania',
}

export interface Employee {
  id: number;
  firstName: string;
  surName: string;
  pesel: string;
  personalAddress: Address;
  taxOfficeAddress: Address;
  yearOfBirthday: number;
  deal: {
    startDate: string;
    endDate: string;
  }
  permissions: {
    lifeguard: {
      refreshedDate: string;
      endDate: string;
    },
    firstAid: {
      refreshedDate: string;
      endDate: string;
    },
    usefulPermissions: UsefulPermission[],
    anotherPermission: string;
    medicalExamination: {
      refreshedDate: string;
      endDate: string;
    },
    OHSTests: {
      refreshedDate: string;
      endDate: string;
    },
    sanel: {
      endDate: string;
    },
    studentCard: {
      endDate: string;
    }
  }
}
