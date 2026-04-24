import { create } from "zustand";
import { Patients } from "@/types/Patient/Patient";
import { Status } from "@/consts/enum";
import { INITIAL_PATIENT } from "@/consts/patient/patient.initial";

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

export const usePatientStore = create<Store>((set) => ({
  currentPatient: INITIAL_PATIENT,
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
      currentPatient: INITIAL_PATIENT,
      lastUpdatedAt: 0,
    }),
}));