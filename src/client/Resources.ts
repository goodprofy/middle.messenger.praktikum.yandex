import { HTTPClient } from '../class';

type Resource = {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: `${string}.${string}Z`;
};

type ResourceUplaodParams = { file: File };

export class ResourcesClient extends HTTPClient {
  uploadFile(data: ResourceUplaodParams) {
    return this.post<Resource>('resources', { data });
  }
}
