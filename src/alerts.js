import Swal from "sweetalert2";

export const successAlert = Swal.mixin({
  icon: "success",
  backdrop: true,
  toast: false,
  grow: "false",
  timer: 1250,
  timerProgressBar: true,
  showConfirmButton: false
});

export const failAlert = Swal.mixin({
  icon: "error",
  backdrop: true,
  toast: false,
  grow: "false",
  showConfirmButton: true
});

export const confirmAlert= Swal.mixin({
  icon: "warning",
  backdrop: true,
  toast: false,
  grow: "false",
  showConfirmButton: true,
  showCancelButton: true
});
