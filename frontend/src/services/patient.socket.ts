import { socket } from "@/lib/socket/socket";
import { Patients } from "@/types/Patient/Patient";
import { Status } from "@/consts/enum";

export const emitUpdate = (data: Patients) => {
  socket.emit("form:update", data);
};

export const emitSubmit = (data: Patients) => {
  socket.emit("form:submit", data);
};

export const emitStatus = (status: Status) => {
  socket.emit("form:status", status);
};