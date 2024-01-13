import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CollectionDto } from '../../instacook/dto/collection'; // Assuming you have a CollectionDto

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  private api = environment.api + '/collections';

  constructor(private httpClient: HttpClient) {}

  getAllCollections(): Observable<CollectionDto[]> {
    return this.httpClient.get<CollectionDto[]>(`${this.api}`);
  }

  getCollectionById(collectionId: string): Observable<CollectionDto> {
    return this.httpClient.get<CollectionDto>(`${this.api}/${collectionId}`);
  }

  getCollectionsByUserId(userId: string): Observable<CollectionDto[]> {
    return this.httpClient.get<CollectionDto[]>(`${this.api}/${userId}`);
  }

  createCollection(collection: CollectionDto) {
    return this.httpClient.post<CollectionDto>(`${this.api}`, collection);
  }

  deleteCollection(collectionId: string) {
    return this.httpClient.delete<CollectionDto>(`${this.api}/${collectionId}`);
  }

  editCollection(collection: any, collectionId: number) {
    return this.httpClient.patch<any>(`${this.api}/${collectionId}`, collection);
  }
}
