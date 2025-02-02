import { User } from "../components/User";

export function filterByCountry(data: User[], country: string): User[] {
  return data.filter(user => user.country === country);
}

export function sortByCreationTime(data: User[], ascending: boolean) {
  if (ascending) {
    return data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } else {
    return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
} 