export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
}

export interface Customer {
    firebaseUid: string;
    email: string;
    displayName: string;
    phoneNumber: string;
    photoURL: string;
    isActive: boolean;
    addresses: Address[];
}
