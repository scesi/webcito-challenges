export interface RepoLanguages {
  [language: string]: number;
}

export interface RepoLanguagesMap {
  [repoName: string]: RepoLanguages;
}