export function phoneNumberMask(tel: string) {
  if (tel) {
    tel = tel.replace(/\D+/g, "");

    tel = tel.replace(/(\d{2})(\d{4})/g, "($1) $2");

    if (tel.length === 13) {
      tel = tel.replace(/(\d{4})(\d{4})/g, "$1-$2");
    } else {
      tel = tel.replace(/(\d{5})(\d{4})/g, "$1-$2");
    }
  }

  return tel;
}
