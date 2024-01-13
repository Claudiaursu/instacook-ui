import { UserDto } from "./user";

export class CollectionDto {
  id?: number;
  titluColectie?: string;
  descriereColectie?: string;
  publica?: string;
  calePoza?: string;
  utilizator?: UserDto;
}
