import { Candidate } from "./Candidate";

export type User = {
    emailId?: string;
    userName?: string;
    password?: string;
    phoneNumber?: number;
    role?: string;
    hasVoted?: boolean;
    candidate?: Candidate;
}