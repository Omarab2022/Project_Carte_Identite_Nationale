import { RequestStatus } from './request-status.enum';

export interface RequestStatusUpdateDTO {
    status: RequestStatus;
    policeCenterDate?: string; // ISO date string
}