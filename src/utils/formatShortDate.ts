
const formatShortDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Les mois commencent à 0
  const year = date.getFullYear().toString().slice(-2); // Récupère les deux derniers chiffres

  return `${day}/${month}/${year}`;
};

export default formatShortDate;