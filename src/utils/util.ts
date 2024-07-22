import { v4 as uuidv4 } from 'uuid';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

/**
 * @method sortJSON
 * @param {Object} value
 * @returns {Object}
 * @description Sort the object in ascending order as per keys
 */
export const sortJSON = <T>(jsonObj: T): T => {
  // check if json object is not empty and is of object type
  if (jsonObj && typeof jsonObj === 'object') {
    // get the keys of the object
    const keys = Object.keys(jsonObj);
    // sort the keys
    keys.sort();
    // create a new empty object
    const sortedObj: T = {} as T;
    // add the key-value pairs to the new object in sorted order
    keys.forEach(key => {
      sortedObj[key] = jsonObj[key];
    });
    // return the sorted object
    return sortedObj;
  }
  // if json object is empty or is not of object type return the same object
  return jsonObj;
};

export const getRandomId = () => {
  return uuidv4();
};

export type ValueOf<T> = T[keyof T];
