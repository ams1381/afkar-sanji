import { useState } from "react";

export const useLocalStorage = () => {
  const setItem = (key,value) => {
    if (typeof window !== 'undefined')
    {
      localStorage.setItem(key, value);
    }
  };

  const getItem = (key) => {
    if (typeof window !== 'undefined')
    {
      const value = localStorage.getItem(key);
      return value;
    }
  };

  const removeItem = (key) => {
    if (typeof window !== 'undefined')
    {
      localStorage.removeItem(key);
    }
  };

  return { setItem, getItem, removeItem };
};