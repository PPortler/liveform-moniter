import { create } from "zustand";
import { Patients } from "@/types/Patient/Patient";
import { Status } from "@/consts/enum";

type SubmittedPatient = Patients & {
  submittedAt: string;
};

type Store = {
  currentPatient: Patients;
  submittedPatients: SubmittedPatient[];
  status: Status;
  lastUpdatedAt: number;
  clearCurrentPatient: () => void;
  setCurrentPatient: (data: Patients) => void;
  setStatus: (status: Status) => void;
  addSubmittedPatient: (data: Patients) => void;
};

const initial: Patients = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  gender: "",
  nationality: "",
};

export const usePatientStore = create<Store>((set) => ({
  currentPatient: initial,
  submittedPatients: [],
  status: Status.INACTIVE,
  lastUpdatedAt: 0,

  setCurrentPatient: (data) =>
    set({ currentPatient: data, lastUpdatedAt: Date.now() }),

  setStatus: (status) =>
    set({ status }),

  addSubmittedPatient: (data) =>
    set((state) => ({
      submittedPatients: [
        {
          ...data,
          submittedAt: new Date().toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...state.submittedPatients,
      ],
    })),

  clearCurrentPatient: () =>
    set({
      currentPatient: initial,
      lastUpdatedAt: 0,
    }),
}));