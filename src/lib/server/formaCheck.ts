//Fonction qui vérifie si le format est le bon

/**
 * Verifie que c'est un groupe d'Intégration en testant si le nom du groupe correspond au format "groupe-*-202*"
 * @param chaine le nom du groupe à tester
 * @returns true si c'est un groupe d'intégration, false sinon
 */
export function FormatGroupInte(chaine: string): boolean {
    const modeleGroupInte = /^groupe-.*-202.*$/; // A changer chaque année pour récup les groupes que de cette année //TODO
    return modeleGroupInte.test(chaine);
}

/**
 * Verifie que c'est un groupe de postulant en testant si le nom du groupe correspond au format "groupe-*-202*"
 * @param chaine le nom du groupe à tester
 * @returns true si c'est un groupe de postulant, false sinon
 */
export function FormatGroupPostulant(chaine: string): boolean {
    const modeleGroupPostulant = /^postulant.*$/;
    return modeleGroupPostulant.test(chaine);
}