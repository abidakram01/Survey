import { UUID } from 'angular2-uuid';

export class UniqueIdHelper {
  /**
   * Gets a unique timestamp number
   */
  getUniqueId(): string {
    return UUID.UUID();
  }
}
