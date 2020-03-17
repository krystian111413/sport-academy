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
  id: string;
  firstName: string;
  surName: string;
  pesel: string;
  personalAddress: Address;
  taxOfficeAddress: string;
  yearOfBirthday: number;
  deal: {
    startDate: string;
    endDate: string;
  }
  permissions: {
    lifeguard: {
      refreshedDate: string;
      endDate: string;
      image: {
        type: string;
        data: string;
      }
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
    ohstests: {
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
