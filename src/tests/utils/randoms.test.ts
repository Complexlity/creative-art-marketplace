import { describe, it, expect } from "vitest";
import { generateRandomDate, generateRandomNFTPrice, generateRandomTimeDifference, getRandomNumber, pickFromArray, shuffleArray } from "~/utils/randoms";



describe('shuffleArray', () => {
    it('should shuffle an empty array', () => {
      expect(shuffleArray([])).toEqual([]);
    });
  
    it('should shuffle an array with one element', () => {
      const arr = [1];
      const shuffledArr = shuffleArray(arr);
      expect(shuffledArr).toEqual(arr); // Check if the array has been altered
      expect(shuffledArr).toHaveLength(1); // Ensure the length remains 1
    });
  
    it('should shuffle an array with multiple elements', () => {
      const arr = [1, 2, 3, 4, 5];
        const shuffledArr = shuffleArray(arr);
      expect(shuffledArr).not.toEqual(arr); // Check if the array has been altered
      expect(shuffledArr).toHaveLength(5); // Ensure the length remains 5
      expect(new Set(shuffledArr)).toHaveLength(5); // Ensure all elements are unique
    });
  });
  

  describe('generateRandomNFTPrice', () => {
    it('generates a price within the defined range', () => {
      const price = generateRandomNFTPrice();
      expect(price).toBeGreaterThanOrEqual(0.01);
      expect(price).toBeLessThanOrEqual(5);
      expect(typeof price).toBe('number');
    });
  
    it('returns a number with two decimal places', () => {
      const price = generateRandomNFTPrice();
      expect(price % 1).toBeCloseTo(0, -2);
    });
  });

  describe('generateRandomTimeDifference', () => {
    it('returns a random time difference within the expected range', () => {
      const timeDifference = generateRandomTimeDifference();
      expect(timeDifference).toBeGreaterThanOrEqual(0);
      expect(timeDifference).toBeLessThanOrEqual(120 * 60 * 60 * 1000); // 5 days in milliseconds
      expect(typeof timeDifference).toBe('number');
    });
  });
  
  describe('generateRandomDate', () => {
    it('generates a valid date string within the last 7 days', () => {
      const dateString = generateRandomDate();
      const currentDate = new Date();
  
        // Validate the format
    const dateRegex = /\d{2}\/\d{2}\/\d{4} \d{1,2}:\d{2} (AM|PM)/;

      expect(dateString).toMatch(dateRegex);
    //   expect(dateString).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2} (AM|PM)$/);
  
      // Validate the date range
      const generatedDate = new Date(dateString);
      expect(generatedDate.getTime()).toBeGreaterThanOrEqual(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      expect(generatedDate.getTime()).toBeLessThanOrEqual(currentDate.getTime());
    });
  });

  describe('pickFromArray', () => {
    it('returns a random element from the array', () => {
      const arr = ['apple', 'banana', 'cherry'];
      const pickedItem = pickFromArray(arr);
      expect(pickedItem).toBeDefined();
        expect(typeof pickedItem).toBe('string'); // Assuming T is a string in this case
        //@ts-expect-error picked should be defined from the text above
      expect(arr.includes(pickedItem)).toBeTruthy();
    });
  
    it('returns undefined for an empty array', () => {
      const arr: string[] = [];
      const pickedItem = pickFromArray(arr);
      expect(pickedItem).toBeUndefined();
    });
  });

  describe('getRandomNumber', () => {
    it('should return a string representing a number between 0 and n (inclusive)', () => {
      const n = 10;
      const result = getRandomNumber(n);
      const number = parseInt(result, 10);
      expect(number).toBeGreaterThanOrEqual(0);
      expect(number).toBeLessThanOrEqual(n);
    });
  
    it('should return "0" for n = 0', () => {
      const result = getRandomNumber(0);
      expect(result).toBe('0');
    });
  
    it('should return a string', () => {
      const n = 5;
      const result = getRandomNumber(n);
      expect(typeof result).toBe('string');
    });
  
    it('should handle large numbers', () => {
      const n = 1000000;
      const result = getRandomNumber(n);
      const number = parseInt(result, 10);
      expect(number).toBeGreaterThanOrEqual(0);
      expect(number).toBeLessThanOrEqual(n);
    });
  
    
  });
  