import { socket } from "@/lib/socket/socket";
import { Patients } from "@/types/Patient/Patient";

export const emitUpdate = (data: Patients) => {
  socket.emit("form:update", data);
};

export const emitSubmit = (data: Patients) => {
  socket.emit("form:submit", data);
};
