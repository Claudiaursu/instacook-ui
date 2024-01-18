import { CollectionDto } from "./collection";

export class RecipeDto {
  id?: number;
  titluReteta?: string;
  dificultate?: string;
  calePoza?: string;
  instructiuni?: string;
  ingrediente?: Array<string>;
  colectie?: CollectionDto;
}
