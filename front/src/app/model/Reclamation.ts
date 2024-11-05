

export enum CategorieType {
    negatif,
    positif,
    neutre
    // Ajoutez plus de catégories ici si nécessaire
}
export class Reclamation {
    constructor(

        public id?: number,
        public descriptionReclamation?: string,
        public name?: string,
        public dateSoumission?: Date,
        public categorie?: CategorieType,
    


    ) {}
    }
  
    