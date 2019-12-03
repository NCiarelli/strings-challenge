import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-strings',
  templateUrl: './strings.component.html',
  styleUrls: ['./strings.component.css']
})
export class StringsComponent implements OnInit {

  userString: string = "";
  reverseString: string = "";
  titleString: string = "";
  vowelCount: number = 0;
  commonCharacter: string = "";

  constructor() { }

  ngOnInit() {
  }

  onSubmit(formData: NgForm) {
    // console.log(formData);
    this.userString = formData.value["user-string"];
    this.reverseString = this.reverse(this.userString);
    this.titleString = this.titleCaseForString(this.userString);
    this.vowelCount = this.countVowels(this.userString);
    this.commonCharacter = this.findMostCommonCharacter(this.userString);
  }

  reverse(inputString: string): string {
    let reverse: string = "";
    for (let i = inputString.length - 1; i >= 0; i--) {
      reverse += inputString.charAt(i);
    }
    return reverse;
  }

  titleCaseForWord(inputString: string): string {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
  }

  titleCaseForString(inputString: string): string {
    // split up the input string by spaces
    let stringArray: string[] = inputString.split(" ");
    // TitleCase each of the resulting strings
    stringArray.forEach((string, i) => {
      stringArray[i] = this.titleCaseForWord(string);
    })
    // Put the newly formatted original string back together
    let returnString: string = stringArray.join(" ");

    return returnString;
  }

  isPalindrome(inputString: string): boolean {
    const lowerString = inputString.toLowerCase();
    const stringLen = lowerString.length;
    for (let i = 0; i < stringLen / 2; i++) {
      if (lowerString.charAt(i) !== lowerString.charAt(stringLen - (i + 1))) {
        return false;
      }
    }
    return true;
  }

  countVowels(inputString: string): number {
    let vowelCount: number = 0;
    const lowerString: string = inputString.toLowerCase();
    for (let i = 0; i < inputString.length; i++) {
      switch (lowerString.charAt(i)) {
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u':
          vowelCount++;
          break;
        default:
      }
    }
    return vowelCount;
  }

  countVowelsRegex(inputString: string): number {
    var m = inputString.match(/[aeiou]/gi);
    return m === null ? 0 : m.length;
  }

  findMostCommonCharacter(inputString: string): string {
    let charCounts = {};
    let mostCommon = "";
    // Check each character of the string
    for (let i = 0; i < inputString.length; i++) {
      let currentChar = inputString.charAt(i);
      // If the character is not a key in the charCounts
      if (!charCounts[currentChar]) {
        charCounts[currentChar] = 0;
      }
      // Increment the count of the current character
      charCounts[currentChar]++;
      // Check if the current character beats the current most common character
      // Also change it is the current most common character is an empty string
      if (charCounts[currentChar] > charCounts[mostCommon] || mostCommon === "") {
        mostCommon = currentChar;
      }
    }
    return mostCommon;
  }

}
