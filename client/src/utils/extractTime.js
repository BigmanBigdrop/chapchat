// Fonction pour extraire l'heure (HH:MM) d'une chaîne de date
export function extractTime(dateString) {
  // Convertit la chaîne de date en objet Date
  const date = new Date(dateString);
  // Obtient les heures et les minutes en ajoutant un zéro devant si nécessaire
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  // Retourne l'heure au format HH:MM
  return `${hours}:${minutes}`;
}

// Fonction d'assistance pour ajouter un zéro devant les nombres à un chiffre
function padZero(number) {
  // Convertit le nombre en chaîne de caractères et ajoute un zéro devant si nécessaire
  return number.toString().padStart(2, "0");
}
