export interface Address {
  street: string;
  city: string;
  buildingNumber: string;
  code: string;
  email: string;
  phone: string;
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
    image: any;
    place: string;
    startDate: string;
    endDate: string;
  }
  permissions: {
    lifeguard: {
      releaseDate: string;
      image: {
        type: string;
        data: string;
      }
    },
    firstAid: {
      image: any;
      refreshedDate: string;
      endDate: string;
    },
    usefulPermissions: {
      frogman: boolean;
      frogmanImage: any;
      swimmingInstructor: boolean;
      swimmingInstructorImage: any;
      yachtSailor: boolean;
      yachtSailorImage: any;
      helmsman: boolean;
      helmsmanImage: any;
    },
    anotherPermission: string;
    anotherPermissionImage: any;
    medicalExamination: {
      image: any;
      refreshedDate: string;
      endDate: string;
    },
    ohstests: {
      image: any;
      refreshedDate: string;
      endDate: string;
    },
    sanel: {
      image: any;
      endDate: string;
    },
    studentCard: {
      image: any;
      endDate: string;
    }
  }
}
