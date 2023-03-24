import { User } from "./User";

export type Candidate = {
    candidateId?: number;
    candidateName?: string;
    voteCounts?: number;
    users?: User[];

}