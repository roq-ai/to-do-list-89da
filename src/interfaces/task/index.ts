import { AttachmentInterface } from 'interfaces/attachment';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface TaskInterface {
  id?: string;
  title: string;
  description?: string;
  status: string;
  assignee_id?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  attachment?: AttachmentInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    attachment?: number;
  };
}

export interface TaskGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  status?: string;
  assignee_id?: string;
  organization_id?: string;
}
