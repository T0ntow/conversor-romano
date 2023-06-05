import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'conversor-romano';

  numberRoman: string = '';
  numberArabic: number | undefined;
  numberAux: number | undefined;
  
  numberInArabic: string | undefined;
  numberInRoman: string | undefined;

  convertToArabic() {
    
    if (/^[IiVvXxLlCcDdMm]+$/.test(this.numberRoman)) {
      this.numberAux = this.convertRomanToArabic(this.numberRoman.toUpperCase());
      if (this.numberAux < 1 || this.numberAux > 3999) {
        alert("Por favor insira um valor entre I(1) e MMMCMXCIX(3999)")
      }
      else {
        this.numberInArabic = this.numberAux.toString();
      }
    } else {
      alert("Por favor insira apenas algarismos romanos")
    }
  }

  convertRomanToArabic(roman: string): number {
    const romanValues: { [key: string]: number } = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000
    };

    let result = 0;
    let prevValue = 0;

    for (let i = roman.length - 1; i >= 0; i--) {
      const current = roman[i];
      const currentValue = romanValues[current];

      if (currentValue < prevValue) {
        result -= currentValue;
      } else {
        result += currentValue;
        prevValue = currentValue;
      }
    }

    return result;
  }

  convertToRoman() {
    if (this.numberArabic) {
      if (this.numberArabic < 1 || this.numberArabic > 3999) {
        alert("Por favor insira um valor entre 1 e 3999")
      }
      else {
        this.numberInRoman = this.convertArabicToRoman(this.numberArabic);
      }
    }
  }

  convertArabicToRoman(arabic: number): string {
    const romanValues: { [key: number]: string } = {
      1:    'I',
      5:    'V',
      10:   'X',
      50:   'L',
      100:  'C',
      500:  'D',
      1000: 'M'
    };

    let result = '';
    const keys = Object.keys(romanValues).reverse();

    for (const key of keys) {
      const value = parseInt(key, 10);

      while (arabic >= value) {
        result += romanValues[value];
        arabic -= value;
      }
    }

    return result;
  }

}
