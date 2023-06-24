export interface User {
    userID: string;
    userImage: string;
    userName: string;
    userEmail: string;
    userType: string[];
    investedProjects: { projectID: string; investedAmount: number }[];
    startedProjects: string[];
  }
  