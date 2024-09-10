// lib/util.tsx

'use client';

export const isAuthenticated = (): boolean => {
  let authenticated = false
  if (typeof localStorage !== 'undefined') {
    authenticated = localStorage.getItem("isAuthenticated") === "true"
  }
  return authenticated
}

export const getUserName = (): string | null => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem("userName")
  }
  return null;
};

export const getJobTitle = (): string | null => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem("jobTitle");
  }
  return null;
};

export const setUserName = (userName: string | null): void => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem("userName", userName ?? "");
  }
};

export const setJobTitle = (jobTitle: string | null): void => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem("jobTitle", jobTitle ?? "");
  }
};